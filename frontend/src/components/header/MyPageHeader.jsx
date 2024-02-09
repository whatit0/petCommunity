import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import '../style/Header.css'; // 경로가 프로젝트 구조에 맞게 수정되었는지 확인하세요.

function MyPageHeader() {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('userToken'); // 토큰 삭제
        setIsLoggedIn(false);
        navigate('/');
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
                <Link to="/community">공지사항</Link>
                <Link to="/community">커뮤니티</Link>
                <div className="dropdown">
                    <button className="dropBtn">마이페이지</button>
                    <div className="dropdown-content">
                        <Link to="/profile/update" className="dropdown-item">회원수정</Link>
                        <Link to="/profile/delete" className="dropdown-item">회원탈퇴</Link>
                    </div>
                </div>
            </nav>
            <div className="header-links">
                <button onClick={handleLogout} className="btn-signup">로그아웃</button>
            </div>
        </header>
    );
}

export default MyPageHeader;
