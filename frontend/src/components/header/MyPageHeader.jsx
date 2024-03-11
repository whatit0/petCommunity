import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../AuthContext';
import '../style/Header.css';

function MyPageHeader() {
    const navigate = useNavigate();
    const {setIsLoggedIn} = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);
    const userNo = localStorage.getItem('userNo');

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userNo');
        setIsLoggedIn(false);
        navigate('/');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleServiceDropdown = () => {
        setShowServiceDropdown(!showServiceDropdown)
    };

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
                <div className="dropdown">
                    <button onClick={toggleDropdown} className="dropBtn">마이페이지</button>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <Link to={`/profile/update/${userNo}`} className="dropdown-item">회원수정</Link>
                            <Link to={`/profile/delete/${userNo}`} className="dropdown-item">회원탈퇴</Link>
                        </div>
                    )}
                </div>
                <Link to="/community">공지사항</Link>
            </nav>
            <div className="header-links">
                <button onClick={handleLogout} className="btn-signup">로그아웃</button>
            </div>
        </header>
    );
}

export default MyPageHeader;
