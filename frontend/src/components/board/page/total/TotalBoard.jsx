import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import QAGroup from "../qa/QAGroup";
import styles from "./TotalBoard.module.css";

const TotalBoard = () => {
    const [selectedTap, setSelectedTab] = useState('all'); // 초기 탭 상태는 all [all, qa, daily, info]
    const [boards, setBoards] = useState([]);
    const [sortBy, setSortBy] = useState('latest');
    const [searchText, setSearchText] = useState('');

    const getTabClassName = (tabName) => {
        return selectedTap === tabName ? `${styles.div} ${styles.selectedTab}` : styles.div;
    };

    const sortBoards = (boards) => {
        return boards.slice().sort((a, b) => {
            if (sortBy === 'latest') {
                return new Date(b.boardDate) - new Date(a.boardDate);
            } else if (sortBy === 'popular') {
                return b.boardLike - a.boardLike;
            }
        });
    };

    const sortAndFilterBoards = () => {
        // 필터링 및 정렬 로직에 검색 텍스트 조건 추가
        return boards
            .filter(board => {
                if (selectedTap !== 'all') {
                    const tapToTypeMap = {
                        qa: 'QUESTION',
                        daily: 'DAILY',
                        info: 'INFO'
                    };
                    if (board.boardType !== tapToTypeMap[selectedTap]) return false;
                }
                if (searchText && !(board.boardTitle.toLowerCase().includes(searchText.toLowerCase()) || board.boardContent.toLowerCase().includes(searchText.toLowerCase()))) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => {
                if (sortBy === 'latest') {
                    return new Date(b.boardDate) - new Date(a.boardDate);
                } else if (sortBy === 'popular') {
                    return b.boardLike - a.boardLike;
                }
            });
    };

    const handleSortChange = (e) => {
        const {name, checked} = e.target;
        if (checked) {
            setSortBy(name);
        }
    }
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

        useEffect(() => {
            fetch('http://localhost:8080/api/boards')
                .then(response => response.json())
                .then(data => setBoards(data))
                .catch(error => console.error('fetching Error : ', error));
        }, []);

    return (
        <div className={styles.desktop2}>
            <nav className={styles.parent}>
                <div className={getTabClassName('all')} onClick={() => setSelectedTab('all')}>전체</div>
                <div className={getTabClassName('qa')} onClick={() => setSelectedTab('qa')}>Q&A</div>
                <div className={getTabClassName('daily')} onClick={() => setSelectedTab('daily')}>일상</div>
                <div className={getTabClassName('info')} onClick={() => setSelectedTab('info')}>정보</div>
            </nav>
            <div className={styles.frameSearch}>
                <div className={styles.search}>
                    <div className={styles.searchChild}/>
                    <img className={styles.search2Icon} alt="" src="/search2.svg"/>
                    <input
                        className={styles.input}
                        placeholder="찾으시는 커뮤니티 글을 입력해주세요."
                        type="text"
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className={styles.checkboxPair}>
                    <div className={styles.frameParent}>
                        <div className={styles.checkboxOnParent}>
                            <input className={styles.checkboxOn}
                                   type="checkbox"
                                   name="latest"
                                   checked={sortBy === 'latest'}
                                   onChange={handleSortChange}
                            />
                            <div className={styles.useAsThe}>최신순</div>
                        </div>
                        <div className={styles.checkboxOnGroup}>
                            <input className={styles.checkboxOn1}
                                   type="checkbox"
                                   name="popular"
                                   checked={sortBy === 'popular'}
                                   onChange={handleSortChange}/>
                            <div className={styles.useAsThe1}>인기순</div>
                        </div>
                    </div>
                    <Link to="/write" className={styles.vectorParent}>
                        <img className={styles.editIcon} alt="" src="/edit.svg"/>
                        <div className={styles.divWrite}>글쓰기</div>
                    </Link>
                </div>
            </div>
            <div className={styles.qAGroupParent}>
                {sortAndFilterBoards().map((board) => (
                    <QAGroup key={board.boardNo} board={board} />
                ))}
            </div>
        </div>
    );
};

export default TotalBoard;
