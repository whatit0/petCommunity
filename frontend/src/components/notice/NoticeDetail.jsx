import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import "../style/notice.css";

function NoticeDetail() {
    const location = useLocation();
    const noticeData = location.state.data;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
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
            </div>
        </div>
    );
}

export default NoticeDetail;