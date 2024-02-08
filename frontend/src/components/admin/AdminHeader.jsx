import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../AuthContext';
import '../style/Header.css';

function AdminHeader() {
    const navigate = useNavigate();
    const {setIsLoggedIn} = useAuth();
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
                <Link to="/">
                    <img src="/logo.jpg" alt="Logo"/>
                </Link>
            </div>
            <nav className="navigation">
                <Link to="/">Home</Link>
                <Link to="/user/community">공지사항 관리</Link>
                <Link to="/user/community">커뮤니티 관리</Link>
                <div className="dropdown">
                    <button onClick={toggleDropdown} className="dropbtn">회원 관리</button>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <Link to="/profile/user/update" className="dropdown-item">회원수정</Link>
                            <Link to="/profile/user/delete" className="dropdown-item">회원탈퇴</Link>
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

export default AdminHeader;
