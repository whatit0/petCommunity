import React, {useEffect, useState} from "react";
import '../style/MemberPage.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../AuthContext';
import {jwtDecode} from 'jwt-decode';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function LoginPage() {
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userIdValid, setUserIdValid] = useState(false);
    const [userPwdValid, setUserPwdValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [userIdError, setUserIdError] = useState('');
    const [userPwdError, setUserPwdError] = useState('');

    const navigate = useNavigate();
    const {setIsLoggedIn} = useAuth();

    const auth = getAuth();

    const handleUserId = (e) => {
        const newId = e.target.value;
        setUserId(newId);
        const regex = /^[a-z]+[a-z0-9]{5,19}$/g;
        setUserIdValid(regex.test(newId));
    }

    const handleUserPwd = (e) => {
        const newPassword = e.target.value;
        setUserPwd(newPassword);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@%*#^?&\\()\-_=+]).{8,16}$/;
        setUserPwdValid(regex.test(newPassword));
    }
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        setNotAllow(!(userIdValid && userPwdValid));
    }, [userIdValid, userPwdValid]);

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!notAllow) {
            try {
                const response = await axios.post('http://localhost:8080/api/login', {
                    userId,
                    userPwd
                });
                if (response.data && response.data["accessToken"]) {
                    const decodedToken = jwtDecode(response.data["accessToken"]);
                    const email = `${userId}@domain.com`;
                    const password = userPwd;
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    console.log(currentUser);

                    localStorage.setItem('userToken', response.data["accessToken"]);
                    localStorage.setItem('userNo', decodedToken["userNo"]);
                    setIsLoggedIn(true);
                    if (decodedToken["auth"].includes('ROLE_ADMIN')) {
                        navigate('/admin/page'); // 관리자 페이지로 리다이렉션
                    } else {
                        navigate('/'); // 일반 사용자 페이지 리다이렉션
                    }
                }
            } catch (error) {
                const errorMessage = error.response?.data.message || "아이디와 비밀번호를 올바르게 입력하세요.";
                setUserIdError(errorMessage);
                setUserPwdError(errorMessage);
            }
        }
    };


    return (
        <div className="page">
            <form onSubmit={handleLogin}>
                <div className="titleWrap">로그인</div>

                <div className="contentWrap">
                    <div className="inputTitle">아이디</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userId"
                            value={userId}
                            placeholder="abcd1234"
                            onChange={handleUserId}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !userIdValid && userId.length > 0 && (
                                <div>올바른 아이디를 입력해주세요.</div>
                            )
                        }
                        {
                            userIdError && (
                                <div>{userIdError}</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">비밀번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            type="password"
                            name="userPwd"
                            value={userPwd}
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            onChange={handleUserPwd}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !userPwdValid && userPwd.length > 0 && (
                                <div>올바른 비밀번호를 입력해주세요.</div>
                            )
                        }
                        {
                            userPwdError && (
                                <div>{userPwdError}</div>
                            )
                        }
                    </div>
                    <div>
                        <button type="submit" disabled={notAllow} className="bottomButton">로그인</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
