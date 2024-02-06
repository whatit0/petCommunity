import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../style/MemberPage.css';
import {useAuth} from '../../AuthContext';

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
        // 사용자 정보를 가져오는 함수
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/userInfo', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                });
                const userData = response.data;
                setUserId(userData.userId);
                setUserName(userData.userName)
                setUserTel(userData.userTel)
                setUserNickname(userData.userNickname)
                setUserAge(userData.userAge)
                setUserGender(userData.userGender)
                setUserAddress(userData.userAddress)
            } catch (error) {
                console.error("사용자 정보 불러오기 오류", error);
            }
        };
        fetchUserData().catch(error => {
            console.error("사용자 정보 불러오기 중 오류 발생", error);
        });
    }, []);


    const deleteSubmit = async (event) => {
        event.preventDefault();
        if (!notAllow) {
            try {
                const token = localStorage.getItem('userToken');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                await axios.post('http://localhost:8080/api/userDelete', {
                    userId,
                    userPwd,
                    userName,
                    userTel,
                    userNickname,
                    userAge,
                    userGender,
                    userAddress
                }, config);

                localStorage.removeItem('userToken');
                if (setIsLoggedIn) {
                    setIsLoggedIn(false);
                }
                alert('그 동안 이용해 주셔서 감사합니다.');
                window.location.href = '/login';
            } catch (error) {
                alert('비밀번호를 올바르게 입력해주세요.');
            }
        }
    };

    return (
        <div className="page">
            <form onSubmit={deleteSubmit}>
                <div className="titleWrap">회원탈퇴</div>
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
                            readOnly
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
                            readOnly
                            onChange={handleUserNickname}/>
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">나이</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userAge"
                            value={userAge}
                            readOnly
                            onChange={handleUserAge}/>
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">성별</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userGender"
                            value={userGender}
                            readOnly
                            onChange={handleUserGender}/>
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">전화번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userTel"
                            value={userTel}
                            readOnly
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
                            readOnly
                            onChange={handleUserAddress}/>
                    </div>
                    <div>
                        <button type="submit" disabled={notAllow} className="bottomButton">회원 탈퇴
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}