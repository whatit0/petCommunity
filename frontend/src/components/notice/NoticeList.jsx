import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { Link, useNavigate } from 'react-router-dom';
import "../style/notice.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/bootstrap.css';
import {jwtDecode} from "jwt-decode";

function NoticeList() {
    const navigate = useNavigate();
    const [notice, setNotice] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const [totalItems, setTotalItems] = useState(0);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const role = decodedToken.auth;
            setUserRole(role);
        }
    }, []);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/notices', {
                    params: {
                        page: page - 1,
                        size: itemsPerPage
                    }
                });
                setNotice(response.data.content);
                setTotalItems(response.data.totalElements);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };
        fetchNotice();
    }, [page, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const noticeDetail = async (noticeNo) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/noticeDetail/${noticeNo}`)
            navigate(`/noticeDetail/${noticeNo}`, { state: { "data": response.data }});
        } catch (error) {
            alert(error + "error 발생")
        }
    }

    return (
        <div id='board'>
            <div className="sub_box">
                <div className="sub_top">
                    <div className="top sub_right_title">
                        <h2>공지사항</h2>
                    </div>
                </div>
                {userRole === "ROLE_ADMIN" && (
                <div style={{width: "100%", textAlign: "right"}}><Link className='write_btn' to="/noticewrite">글쓰기</Link></div>
                )}
                <div className="main_list">
                    <p className='main_list_column flex_between'>
                        <span>번호</span>
                        <span className='b_subject tacen'>제목</span>
                        <span>작성자</span>
                        <span>작성일</span>
                        <span>조회수</span>
                    </p>

                    {notice.map((item, index) => (
                        <div key={index} className="noticeList">
                            <button onClick={() => noticeDetail(item.noticeNo)}>
                                <p className="listNo flex_between">
                                    <span>{item.noticeNo}</span>
                                    <span className='b_subject'>{item.noticeTitle}</span>
                                    <span>{item.userName}</span>
                                    <span>{formatDate(item.noticeDate)}</span>
                                    <span>{item.noticeCnt}</span>
                                </p>
                            </button>
                        </div>
                    ))}
                </div>
                <div className="page_con">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={totalItems}
                        pageRangeDisplayed={5}
                        prevPageText={<span className='material-symbols-rounded gray'>chevron_left</span>}
                        nextPageText={<span className='material-symbols-rounded gray'>chevron_right</span>}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default NoticeList;
