import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/MainContent.css';

function MainContent() {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/boards');
                // HTML 태그를 제거한 내용으로 업데이트
                const updatedBoards = response.data.content.map(board => ({
                    ...board,
                    boardContent: board.boardContent.replace(/<[^>]*>?/gm, ''), // HTML 태그 제거
                }));
                setBoards(updatedBoards);
            } catch (error) {
                console.error("Error boards: ", error);
            }
        };

        fetchBoards();
    }, []);

    return (
        <main className="main-content">
            <SearchBar />
            <section className="recommendation-section">
                <h2 className="recommendation-title">추천 컨텐츠</h2>
                <div className="cards-container">
                    {boards.map(board => (
                        <div key={board.boardNo} className="card">
                            <h3>{board.boardTitle}</h3>
                            <img src="/logo.png" alt="Logo"/>
                            <p>{board.boardContent}</p>
                            <p className="author">작성자 : {board.userName}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

function SearchBar() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="통합 검색" />
            <button>검색</button>
        </div>
    );
}

export default MainContent;
