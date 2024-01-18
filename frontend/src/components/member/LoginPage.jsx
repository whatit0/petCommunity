import React, { useEffect, useState } from "react";
import '../style/MemberPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

export default function LoginPage() {
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] =  useState('');
    const [userIdValid, setUserIdValid] = useState(false);
    const [userPwdValid, setUserPwdValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const handleUserId = (e) => {
        const newId = e.target.value;
        setUserId(newId);
        const regex = /^[a-z]+[a-z0-9]{5,19}$/g;
        if(regex.test(newId)) {
            setUserIdValid(true);
        } else {
            setUserIdValid(false);
        }
    }

    const handleUserPwd = (e) => {
        const newPassword = e.target.value;
        setUserPwd(newPassword);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@%*#^?&\\()\-_=+]).{8,16}$/;
        if(regex.test(newPassword)) {
            setUserPwdValid(true);
        } else {
            setUserPwdValid(false);
        }
    }

    useEffect(() => {
        setNotAllow(!(userIdValid && userPwdValid));
    }, [userIdValid, userPwdValid]);



    const handleLogin = async (event) => {
        event.preventDefault();
        if (!notAllow) {
            try {
                const response = await axios.post('http://localhost:8080/api/login', {
                    userId,
                    userPwd,
                });
                if (response.data && response.data.accessToken) {
                    localStorage.setItem('userToken', response.data.accessToken);
                    console.log('Stored token:', localStorage.getItem('userToken'));
                    setIsLoggedIn(true);
                    navigate('/');
                } else {
                    console.error('accessToken 반환되지 않았습니다.', response.data);
                }
            } catch (error) {
                console.error("로그인 실패", error);
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
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">비밀번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
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
                    </div>
                    <div>
                        <button type="submit" disabled={notAllow} className="bottomButton">로그인</button>
                    </div>
                </div>
            </form>
        </div>
    )
}