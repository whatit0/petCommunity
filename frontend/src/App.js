// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; // AuthContext 경로 확인 필요
import Header from './components/header/Header';
import MyPageHeader from './components/header/MyPageHeader';
import LoginPage from './components/member/LoginPage';
import SignUpPage from './components/member/SignUpPage';
import MyUpdatePage from './components/member/MyUpdatePage';
import MyDeletePage from './components/member/MyDeletePage';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <AuthComponent />
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/profile/update" element={<MyUpdatePage />} />
                        <Route path="/profile/delete" element={<MyDeletePage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

function AuthComponent() {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <MyPageHeader /> : <Header />;
}

export default App;
