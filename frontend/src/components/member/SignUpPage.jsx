import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../style/MemberPage.css';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { set, ref } from 'firebase/database';
import app, { db } from '../../components/chat/firebase';
import { setUser } from "../../components/chat/store/userSlice";
import { useDispatch } from 'react-redux';
import md5 from 'md5';

export default function LoginPage() {
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userName, setUserName] = useState('');
    const [userTel, setUserTel] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAddress, setUserAddress] = useState('');

    const [userIdValid, setUserIdValid] = useState(null);
    const [userPwdValid, setUserPwdValid] = useState(false);
    const [userNameValid, setUserNameValid] = useState(false);
    const [userGenderValid, setUserGenderValid] = useState(false);
    const [userTelValid, setUserTelValid] = useState(false);
    const [userIdMessage, setUserIdMessage] = useState('');

    const [notAllow, setNotAllow] = useState(true);
    let debounceCheck; // 디바운싱 타이머 변수

    const auth = getAuth(app);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            clearTimeout(debounceCheck); // 컴포넌트 언마운트 시 타이머 초기화
        };
    }, [debounceCheck]);

    const handleUserId = (e) => {
        const newId = e.target.value;
        setUserId(newId);
        const regex = /^[a-z]+[a-z0-9]{5,19}$/g;

        if (regex.test(newId)) {
            clearTimeout(debounceCheck); // 이전 타이머 초기화
            debounceCheck = setTimeout(async () => {
                // 디바운싱 타이머 설정
                try {
                    const response = await axios.get(`http://localhost:8080/api/check-userId?userId=${newId}`);
                    if (response.data === true) {
                        setUserIdValid(true);
                        setUserIdMessage("사용 가능한 아이디입니다.");
                    } else {
                        setUserIdValid(false);
                        setUserIdMessage("이미 사용 중인 아이디입니다.");
                    }
                } catch (error) {
                    console.error("아이디 중복 에러", error);
                    setUserIdValid(false);
                    setUserIdMessage("아이디 중복 검사에 실패했습니다.");
                }
            }, 500); // 0.5초 대기
        } else {
            setUserIdValid(false);
            setUserIdMessage("올바른 아이디를 입력해주세요.");
        }
    };


    const handleUserPwd = (e) => {
        const newPassword = e.target.value;
        setUserPwd(newPassword);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@%*#^?&\\()\-_=+]).{8,16}$/;
        if (regex.test(newPassword)) {
            setUserPwdValid(true);
        } else {
            setUserPwdValid(false);
        }
    }

    const handleUserName = (e) => {
        const newName = e.target.value;
        setUserName(newName);
        const regex = /^[가-힣]+$/;
        if (regex.test(newName)) {
            setUserNameValid(true);
        } else {
            setUserNameValid(false);
        }
    }
    const handleUserGender = (e) => {
        const newGender = e.target.value;
        setUserGender(newGender);
        if (newGender === '남자' || newGender === '여자') {
            setUserGenderValid(true);
        } else {
            setUserGenderValid(false);
        }
    }

    const handleUserTel = (e) => {
        const newTel = e.target.value.replace(/-/g, '');
        setUserTel(newTel);
        const regex = /^01[01789][1-9]\d{6,7}$/;
        if (regex.test(newTel)) {
            setUserTelValid(true);
        } else {
            setUserTelValid(false);
        }
    }

    const handleUserNickname = (e) => setUserNickname(e.target.value);
    const handleUserAge = (e) => setUserAge(e.target.value);
    const handleUserAddress = (e) => setUserAddress(e.target.value);

    useEffect(() => {
        if (userIdValid && userPwdValid && userNameValid && userGenderValid && userTelValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [userIdValid, userPwdValid, userNameValid, userGenderValid, userTelValid]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!notAllow) {
            try {
                await axios.post('http://localhost:8080/api/register', {
                    userId,
                    userPwd,
                    userName,
                    userTel,
                    userNickname,
                    userAge,
                    userGender,
                    userAddress
                });
                const Id = userId;
                const email = `${Id}@domain.com`;
                const password = userPwd;

                // 회원가입시 유저 아이디 뒤에 가상의 도메인 주소를 넣어 이메일 형식으로 파이어베이스 가입
                const createdUser = await createUserWithEmailAndPassword(auth, email, password)

                // 사용자 프로필 업데이트
                await updateProfile(createdUser.user, {
                    displayName: userNickname,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                });

                // 추가적인 유저 정보를 Firebase에 저장
                const userRef = ref(db, `users/${createdUser.user.uid}`);
                await set(userRef, {
                    uid: createdUser.user.uid,
                    displayName: createdUser.user.displayName,
                    userNickname: userNickname,
                    password: password,
                    email: email,
                });

                // 사용자 정보를 Redux 스토어에 저장
                const userData = {
                    uid: createdUser.user.uid,
                    displayName: createdUser.user.displayName,
                    photoURL: createdUser.user.photoURL,
                }
                dispatch(setUser(userData));
                window.location.href = '/login';
            } catch (error) {
                console.error("회원가입 오류", error);
            }
        }
    };


    return (
        <div className="page">
            <form onSubmit={handleSubmit}>
                <div className="titleWrap">회원가입</div>
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
                        {userIdMessage && (
                            <div className={`message ${userIdValid ? 'valid' : 'error'}`}>{userIdMessage}</div>
                        )}
                    </div>
                    <div style={{marginTop: "26px"}} className="inputTitle">비밀번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            name="userPwd"
                            type="password"
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
                    <div className="errorMessageWrap">
                        {
                            !userGenderValid && userGender.length > 0 && (
                                <div>성별은 남자 혹은 여자로 입력해주세요.</div>
                            )
                        }
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