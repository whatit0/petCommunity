import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src="/logo.jpg" alt="Logo"/>
            </div>
            <nav className="navigation">
                <Link to="/home">Home</Link>
                <Link to="/info">회사소개</Link>
                <Link to="/announcement">공지사항</Link>
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
