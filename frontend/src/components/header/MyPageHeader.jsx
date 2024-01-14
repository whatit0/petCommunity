import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import '../style/Header.css';

function MyPageHeader() {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('userToken'); // 토큰 삭제
        setIsLoggedIn(false);
        navigate('/');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src="/logo.jpg" alt="Logo"/>
            </div>
            <nav className="navigation">
                <Link to="/community">Home</Link>
                <Link to="/community">공지사항</Link>
                <Link to="/community">커뮤니티</Link>
                <div className="dropdown">
                    <button onClick={toggleDropdown} className="dropbtn">마이페이지</button>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <Link to="/profile/update" className="dropdown-item">회원수정</Link>
                            <Link to="/profile/delete" className="dropdown-item">회원탈퇴</Link>
                        </div>
                    )}
                </div>
            </nav>
            <div className="header-links">
                <button onClick={handleLogout} className="btn-signup">로그아웃</button>
            </div>
        </header>
    );
}

export default MyPageHeader;
