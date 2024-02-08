import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Header from './components/header/Header';
import MyPageHeader from './components/header/MyPageHeader';
import LoginPage from './components/member/LoginPage';
import SignUpPage from './components/member/SignUpPage';
import MyUpdatePage from './components/member/MyUpdatePage';
import MyDeletePage from './components/member/MyDeletePage';
import TotalBoard from './components/board/page/total/TotalBoard';
import WriteBoard from "./components/board/page/write/WriteBoard";

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <AuthComponent />
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/profile/update" element={<MyUpdatePage />} />
                        <Route path="/profile/delete" element={<MyDeletePage />} />
                        <Route path="/community" element={<TotalBoard />} />
                        <Route path="/write" element={<WriteBoard />} />
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
