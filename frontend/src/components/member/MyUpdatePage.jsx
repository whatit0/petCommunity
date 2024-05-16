import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../style/MemberPage.css';
import {useAuth} from '../../AuthContext';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function MyUpdatePage() {
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userName, setUserName] = useState('');
    const [userTel, setUserTel] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAddress, setUserAddress] = useState('');

    const [userIdValid, setUserIdValid] = useState(null);
    const [userPwdValid, setUserPwdValid] = useState(null);
    const [userNameValid, setUserNameValid] = useState(null);
    const [userTelValid, setUserTelValid] = useState(null);

    const [notAllow, setNotAllow] = useState(true);
    const { userNo } = useParams();
    const {setIsLoggedIn} = useAuth();



    const handleUserId = (e) => {
        const newId = e.target.value;
        setUserId(newId);
        if (newId.length > 0) {
            const regex = /^[a-z]+[a-z0-9]{5,19}$/g;
            setUserIdValid(regex.test(newId));
        } else {
            setUserIdValid(null);
        }
    };
    const handleUserPwd = (e) => {
        const newPassword = e.target.value;
        setUserPwd(newPassword);
        if (newPassword.length > 0) {
            const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@%*#^?&\\()\-_=+]).{8,16}$/;
            setUserPwdValid(regex.test(newPassword));
        } else {
            setUserPwdValid(null);
        }
    };

    const handleUserName = (e) => {
        const newName = e.target.value;
        setUserName(newName);
        if (newName.length > 0) {
            const regex = /^[가-힣]+$/;
            setUserNameValid(regex.test(newName));
        } else {
            setUserNameValid(null);
        }
    };

    const handleUserTel = (e) => {
        const newTel = e.target.value;
        setUserTel(newTel);
        if (newTel.length > 0) {
            const regex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
            setUserTelValid(regex.test(newTel));
        } else {
            setUserTelValid(null);
        }
    };

    const handleUserNickname = (e) => setUserNickname(e.target.value);
    const handleUserAge = (e) => setUserAge(e.target.value);
    const handleUserGender = (e) => setUserGender(e.target.value);
    const handleUserAddress = (e) => setUserAddress(e.target.value);

    useEffect(() => {
        setNotAllow(!(userIdValid !== false && userPwdValid !== false && userNameValid !== false && userTelValid !== false));
    }, [userIdValid, userPwdValid, userNameValid, userTelValid]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const config = {
                    headers: { 'Authorization': `Bearer ${token}` }
                };
                const response = await axios.get(`/api/user/info/${userNo}`, config);
                const userData = response.data;
                setUserId(userData.userId);
                setUserName(userData.userName);
                setUserTel(userData.userTel);
                setUserNickname(userData.userNickname);
                setUserAge(userData.userAge);
                setUserGender(userData.userGender);
                setUserAddress(userData.userAddress);
            } catch (error) {
                console.error("사용자 정보 불러오기 오류", error);
            }
        };
        fetchUserData().catch(console.error);
    }, [userNo]);


    const updateSubmit = async (event) => {
        event.preventDefault();
        if (!notAllow) {
            try {
                const token = localStorage.getItem('userToken');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                await axios.patch('/api/user/update', {
                    userId,
                    userPwd,
                    userName,
                    userTel,
                    userNickname,
                    userAge,
                    userGender,
                    userAddress
                }, config);
                // 관리자 여부를 확인
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const isAdmin = decodedToken["auth"].includes('ROLE_ADMIN');

                    if (isAdmin) {
                        // 관리자인 경우 회원 목록 페이지로 리다이렉션
                        alert('회원 정보가 수정되었습니다. 회원 목록 페이지로 이동합니다.');
                        window.location.href = '/admin/user/list';
                    } else {
                        // 일반 사용자인 경우 로그인 페이지로 리다이렉션
                        localStorage.removeItem('userToken');
                        setIsLoggedIn(false);
                        alert('회원 정보가 수정되었습니다. 다시 로그인해 주세요.');
                        window.location.href = '/login';
                    }
                } else {
                    // 토큰이 없는 경우 로그인 페이지로 리다이렉션
                    alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
                    window.location.href = '/login';
                }
            } catch (error) {
                alert('회원 정보 수정에 실패했습니다.');
            }
        }
    };

    return (
        <div className="page">
            <form onSubmit={updateSubmit}>
                <div className="titleWrap">회원수정</div>
                <div className="contentWrap">
                    <div className="inputTitle">아이디</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userId"
                            value={userId}
                            readOnly
                            onChange={handleUserId}/>
                    </div>
                    <div className="errorMessageWrap">
                        {userIdValid === false && (
                            <div className="errorMessage">올바른 아이디를 입력해주세요.</div>
                        )}
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
                            userPwdValid === false && (
                                <div className="errorMessage">올바른 비밀번호를 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">이름</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userName"
                            value={userName}
                            placeholder="이름을 입력해주세요."
                            onChange={handleUserName}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            userNameValid === false && (
                                <div className="errorMessage">올바른 이름을 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">닉네임</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userNickname"
                            value={userNickname}
                            placeholder="닉네임을 입력해주세요."
                            onChange={handleUserNickname}/>
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">나이</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userAge"
                            value={userAge}
                            placeholder="나이를 입력해주세요."
                            onChange={handleUserAge}/>
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">성별</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userGender"
                            value={userGender}
                            placeholder="성별을 입력해주세요."
                            onChange={handleUserGender}/>
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">전화번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userTel"
                            value={userTel}
                            placeholder="전화번호를 입력해주세요."
                            onChange={handleUserTel}/>
                    </div>
                    <div className="errorMessageWrap">
                        {
                            userTelValid === false && (
                                <div className="errorMessage">올바른 전화번호를 입력해주세요.</div>
                            )
                        }
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">주소</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="user_address"
                            value={userAddress}
                            placeholder="주소를 입력해주세요."
                            onChange={handleUserAddress}/>
                    </div>
                    <div>
                        <button type="submit" disabled={notAllow} className="bottomButton">회원 수정
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}