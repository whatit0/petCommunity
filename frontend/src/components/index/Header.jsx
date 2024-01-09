import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // 스타일 시트를 임포트합니다.

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src="/logo.jpg" alt="Logo"/>
            </div>
            <nav className="navigation">
                <Link to="/community">Home</Link>
                <Link to="/community">회사소개</Link>
                <Link to="/community">미아 서비스</Link>
                <Link to="/community">커뮤니티</Link>

            </nav>
            <div className="header-links">
                <Link to="/login" className="btn-login">로그인</Link>
                <Link to="/signup" className="btn-signup">회원가입</Link>
            </div>
        </header>
    );
}

export default Header;
