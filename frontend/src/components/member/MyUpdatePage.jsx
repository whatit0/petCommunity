import React, { useEffect, useState } from "react";
import axios from 'axios';
import './MemberPage.css';

export default function LoginPage() {
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userName, setUserName] = useState('');
    const [userTel, setUserTel] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAddress, setUserAddress] = useState('');

    const [userIdValid, setUserIdValid] = useState(false);
    const [userPwdValid, setUserPwdValid] = useState(false);
    const [userNameValid, setUserNameValid] = useState(false);
    const [userTelValid, setUserTelValid] = useState(false);

    const [notAllow, setNotAllow] = useState(true);


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

    const handleUserName = (e) => {
        const newName = e.target.value;
        setUserName(newName);
        const regex = /^[가-힣]+$/;
        if(regex.test(newName)) {
            setUserNameValid(true);
        } else {
            setUserNameValid(false);
        }
    }

    const handleUserTel = (e) => {
        const newTel = e.target.value;
        setUserTel(newTel);
        const regex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
        if(regex.test(newTel)) {
            setUserTelValid(true);
        } else {
            setUserTelValid(false);
        }
    }

    const handleUserNickname = (e) => setUserNickname(e.target.value);
    const handleUserAge = (e) => setUserAge(e.target.value);
    const handleUserGender = (e) => setUserGender(e.target.value);
    const handleUserAddress = (e) => setUserAddress(e.target.value);

    useEffect(() => {
        if(userIdValid && userPwdValid && userNameValid && userTelValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [userIdValid, userPwdValid, userNameValid, userTelValid]);

    const updateSubmit = async (event) => {
        event.preventDefault();
        if (!notAllow) {
            try {
                await axios.post('http://localhost:8080/api/update', {
                    userPwd,
                    userName,
                    userTel,
                    userNickname,
                    userAge,
                    userGender,
                    userAddress
                });
                window.location.href = '/LoginPage.jsx';
            } catch (error) {
                console.error("회원수정 오류", error);
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
                            !userNameValid && userName.length > 0 && (
                                <div>올바른 이름을 입력해주세요.</div>
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
                            !userTelValid && userTel.length > 0 && (
                                <div>올바른 전화번호를 입력해주세요.</div>
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
                        <button type="submit" disabled={notAllow} className="bottomButton">확인
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}