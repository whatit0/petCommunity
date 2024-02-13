// App.js
import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Header from './components/header/Header';
import MyPageHeader from './components/header/MyPageHeader';
import LoginPage from './components/member/LoginPage';
import SignUpPage from './components/member/SignUpPage';
import MyUpdatePage from './components/member/MyUpdatePage';
import MyDeletePage from './components/member/MyDeletePage';
import RegisterPage from "./components/chat/pages/RegisterPage/RegisterPage";
import LogPage from "./components/chat/pages/LogPage/LogPage";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import app from './components/chat/firebase';
import ChatPage from "./components/chat/pages/ChatPage/ChatPage";
import {useDispatch} from "react-redux";
import {clearUser, setUser} from "./components/chat/store/userSlice";
import HealthMain from "./components/health/HealthMain";
import PetCalorie from "./components/health/PetCalorie";
import PetBmi from "./components/health/PetBmi";
import PetAge from "./components/health/PetAge";
import PetHospital from "./components/health/PetHospital";

function App() {

    const auth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                // navigate('/chat');
                dispatch(setUser({
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }))

            }else{
                // navigate('/log');
                dispatch(clearUser());
            }
        })

        return () =>{
            unsubscribe();
        }
    }, [])

    return (
        <AuthProvider>
            <div className="App">
                <AuthComponent />
                    <Routes>
                        <Route path="/log" element={<LogPage/>} />
                        <Route path="/register" element={<RegisterPage/>} />
                        <Route path="/chat" element={<ChatPage/>} />
                        <Route path="/health" element={<HealthMain/>} />
                        <Route path="/calorie" element={<PetCalorie/>} />
                        <Route path="/bmi" element={<PetBmi/>} />
                        <Route path="/age" element={<PetAge/>} />
                        <Route path="/hospital" element={<PetHospital/>} />


                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/profile/update" element={<MyUpdatePage />} />
                        <Route path="/profile/delete" element={<MyDeletePage />} />
                    </Routes>
            </div>
        </AuthProvider>
    );
}

function AuthComponent() {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <MyPageHeader /> : <Header />;
}

export default App;
