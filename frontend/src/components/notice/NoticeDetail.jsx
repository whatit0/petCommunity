import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import "../style/notice.css";
import {Link, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function NoticeDetail() {
    const location = useLocation();
    const noticeData = location.state.data;
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const role = decodedToken.auth;
            setUserRole(role);
        }
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const update = async (e) => {
        try {
            navigate('/noticeEdit', { state: { "data": noticeData } })
        } catch (error) {
            console.error('에러 발생입니다', error);
        }
    };

    const del = async () => {
        try {
            const checkDel = window.confirm("삭제하시겠습니까?");
            if (checkDel) {
                const response = await axios.get(`/api/delete?noticeNo=${noticeData.noticeNo}`);
                alert(response.data);
                window.location.href = "/notice";
            }
        } catch (error) {
            console.error('에러 발생입니다:', error);
        }
    };

    return (
        <div id="board">
            <div className="sub_box">
                <div className="sub_top">
                    <div className="top sub_right_title">
                        <h2>공지사항</h2>
                    </div>
                </div>
                <div className="board_title">
                    <h2>{noticeData.noticeTitle}</h2>
                    <div className="notice_date">
                        <p>작성자 :<span>{noticeData.userName}</span></p>
                        <p>작성 날짜 :<span>{formatDate(noticeData.noticeDate)}</span></p>
                        <p>조회수 :<span>{noticeData.noticeCnt}</span></p>
                    </div>
                </div>
                <div className="board_con">
                    <p>{noticeData.noticeContent}</p><br/><br/><br/>
                    <img style={{width: '500px'}} src={noticeData.noticeURL}/>
                </div>
                <div className="flex board_detail_btn">
                    {userRole === "ROLE_ADMIN" ? <button onClick={update}>수정</button> : null}
                    {userRole === "ROLE_ADMIN" ? <button onClick={del}>삭제</button> : null}
                    <Link to="/notice" style={{textDecoration: "none", color:"black"}}>목록</Link>
                </div>
            </div>
        </div>
    );
}

export default NoticeDetail;