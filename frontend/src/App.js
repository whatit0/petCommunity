import React, { useEffect } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider, useAuth} from './AuthContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./components/chat/store/userSlice";
import app from "./components/chat/firebase";
import IndexPage from './components/home/IndexPage';
import Header from './components/header/Header';
import MyPageHeader from './components/header/MyPageHeader';
import LoginPage from './components/member/LoginPage';
import SignUpPage from './components/member/SignUpPage';
import MyUpdatePage from './components/member/MyUpdatePage';
import MyDeletePage from './components/member/MyDeletePage';
import AdminPage from "./components/admin/AdminPage";
import AdminHeader from "./components/admin/AdminHeader";
import AdminUserInfoList from "./components/admin/AdminUserInfoList";
import WriteBoard from "./components/board/page/write/WriteBoard";
import TotalBoard from "./components/board/page/total/TotalBoard";
import ShowBoard from "./components/board/page/comment/ShowBoard";
import PetHospital from "./components/health/PetHospital";
import HealthMain from "./components/health/HealthMain";
import PetCalorie from "./components/health/PetCalorie";
import PetAge from "./components/health/PetAge";
import PetBmi from "./components/health/PetBmi";
import ChatPage from "./components/chat/pages/ChatPage/ChatPage";
import MissingMain from "./components/missing/MissingMain";
import Footer from "./components/footer/Footer";
import NoticeList from "./components/notice/NoticeList";
import NoticeWrite from "./components/notice/NoticeWrite";
import NoticeDetail from "./components/notice/NoticeDetail";
import NoticeEdit from "./components/notice/NoticeEdit";

function App() {
    const dispatch = useDispatch();
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }
                dispatch(setUser(userData));
            } else {
                dispatch(clearUser());
            }
        });
        return () => {
            unsubscribe();
        }
    }, []);


    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {/* 메인 홈페이지 라우트 */}
                        <Route path="/" element={<WithHeader><IndexPage/></WithHeader>}/>
                        {/* 사용자 라우트 */}
                        <Route path="/login" element={<WithHeader><LoginPage/></WithHeader>}/>
                        <Route path="/signup" element={<WithHeader><SignUpPage/></WithHeader>}/>
                        <Route path="/profile/update/:userNo" element={<WithHeader><MyUpdatePage/></WithHeader>} />
                        <Route path="/profile/delete/:userNo" element={<WithHeader><MyDeletePage/></WithHeader>}/>
                        <Route path="/community" element={<WithHeader><TotalBoard /></WithHeader>}/>
                        <Route path="/write" element={<WithHeader><WriteBoard /></WithHeader>} />
                        <Route path="/showboard/:boardNo" element={<WithHeader><ShowBoard /></WithHeader>} />
                        <Route path="/missing" element={<WithHeader showFooter={false}><MissingMain /></WithHeader>} />
                        {/* 관리자 라우트 */}
                        <Route path="/admin/page" element={<AdminPage/>}/>
                        <Route path="/admin/user/list" element={<AdminUserInfoList/>}/>
                        <Route path="/notice" element={<WithHeader><NoticeList/></WithHeader>}/>
                        <Route path="/noticewrite" element={<WithHeader><NoticeWrite/></WithHeader>}/>
                        <Route path="/noticeDetail/:noticeNo" element={<WithHeader><NoticeDetail/></WithHeader>}/>
                        <Route path="/noticeEdit" element={<WithHeader><NoticeEdit/></WithHeader>}/>
                        {/*채팅 라우트*/}
                        <Route path="/chat" element={<WithHeader><ChatPage/></WithHeader>}/>
                        {/* 건강 라우트 */}
                        <Route path="/hospital" element={<WithHeader><PetHospital/></WithHeader>}/>
                        <Route path="/health" element={<WithHeader><HealthMain/></WithHeader>}/>
                        <Route path="/calorie" element={<WithHeader><PetCalorie/></WithHeader>}/>
                        <Route path="/bmi" element={<WithHeader><PetBmi/></WithHeader>}/>
                        <Route path="/age" element={<WithHeader><PetAge/></WithHeader>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

function WithHeader({children, showFooter = true}) {
    return (
        <>
            <AuthComponent/>
            {children}
            {showFooter && <Footer/>}
        </>
    );
}

function AuthComponent() {
    const {isLoggedIn, userRole} = useAuth();

    if (!isLoggedIn) {
        return <Header/>;
    } else {
        switch (userRole) {
            case 'ADMIN':
                return <AdminHeader/>; // 관리자용 헤더 컴포넌트
            case 'USER':
            default:
                return <MyPageHeader/>; // 일반 사용자용 헤더 컴포넌트
        }
    }
}

export default App;
