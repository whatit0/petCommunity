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
                    <img src="/logo.jpg" alt="Logo"/>
                </Link>
            </div>
            <nav className="navigation">
                <Link to="/">Home</Link>
                <div className="dropdown">
                    <button onClick={toggleServiceDropdown} className="dropBtn">서비스</button>
                    {showServiceDropdown && (
                        <div className="dropdown-content">
                            <Link to="/service/intro1" className="dropdown-item">건강계산기</Link>
                            <Link to="/service/intro2" className="dropdown-item">미아서비스</Link>
                        </div>
                    )}
                </div>
                <Link to="/community">커뮤니티</Link>
                <Link to="/announcement">공지사항</Link>
            </nav>
            <div className="header-links">
                <Link to="/login" className="btn-login">로그인</Link>
                <Link to="/signup" className="btn-signup">회원가입</Link>
            </div>
        </header>
    );
}

export default Header;
