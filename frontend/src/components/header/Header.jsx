import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';

function Header() {
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);
    const toggleServiceDropdown = () => setShowServiceDropdown(!showServiceDropdown);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="/logo.png" alt="Logo"/>
                </Link>
            </div>
            <nav className="navigation">
                <Link to="/">Home</Link>
                <div className="dropdown">
                    <button onClick={toggleServiceDropdown} className="dropBtn">서비스</button>
                    {showServiceDropdown && (
                        <div className="dropdown-content">
                            <Link to="/missing" className="dropdown-item">미아서비스</Link>
                            <Link to="/health" className="dropdown-item">건강계산기</Link>
                            <Link to="/hospital" className="dropdown-item">동물병원</Link>
                        </div>
                    )}
                </div>
                <div className="dropdown">
                    <button onClick={toggleServiceDropdown} className="dropBtn">커뮤니티</button>
                    {showServiceDropdown && (
                        <div className="dropdown-content">
                            <Link to="/community" className="dropdown-item">게시판</Link>
                            <Link to="/chat" className="dropdown-item">채팅</Link>
                        </div>
                    )}
                </div>
                <Link to="/notice">공지사항</Link>
            </nav>
            <div className="header-links">
                <Link to="/login" className="btn-login">로그인</Link>
                <Link to="/signup" className="btn-signup">회원가입</Link>
            </div>
        </header>
    );
}

export default Header;
