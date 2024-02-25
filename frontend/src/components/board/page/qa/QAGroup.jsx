import styles from "./QAGroup.module.css";
import React from "react";
import {useNavigate} from "react-router-dom";

const QAGroup = ({board}) => {

    const navigate = useNavigate();

    const handleBoardClick = (boardNo) => {
        navigate(`/showboard/${boardNo}`);
    }

    const getTitleByType = (type) => {
        switch (type) {
            case 'QUESTION':
                return 'Q&A';
            case 'DAILY':
                return '일상';
            case 'INFO':
                return '정보';
            default:
                return 'Type ERROR';
        }
    };

    const getCategoryByType = (type) => {
        switch (type) {
            case '개':
                return board.boardDogBreeds;
            default:
                return type;
        }
    }

    const getImgByCategory = (type) => {
        switch (type) {
            case '개':
                return "/dog.svg";
            case '고양이':
                return "/cat.svg";
            case '소동물':
                return "/smallPet.svg";
            default:
                return "/nonePet.svg";
        }
    }

    const extractText = html => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || ""; // 태그 지우고 내용만
    };

    const timeCalculator = (time) => {
        const boardDate = new Date(time);
        const now = new Date();
        const seconds = Math.floor((now - boardDate) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if(seconds < 60) return "방금 전";
        else if (minutes < 60) return `${minutes}분 전`;
        else if (hours < 24) return `${hours}시간 전`;
        else if (days < 7) return `${days}일 전`;
        else return `${weeks}주 전`;
    };


    return (
        <div className={styles.qAGroup}>
            <div className={styles.qAGroupChild}/>
            <div className={styles.infoBox} onClick={() => handleBoardClick(board.boardNo)}>
                <div className={styles.qaParent}>
                    <div className={styles.qa}>{getTitleByType(board.boardType)}</div>
                    <div className={styles.rectangleParent}>
                        <img
                            className={styles.frameItem}
                            loading="eager"
                            alt={board.boardCategory}
                            src={getImgByCategory(board.boardCategory)}
                        />
                        <div className={styles.div}>{getCategoryByType(board.boardCategory)}</div>
                    </div>
                </div>
                <div className={styles.div1}>
                    {board.boardTitle}
                </div>
                <div className={styles.contentdiv}>
                    {extractText(board.boardContent)}
                </div>
            </div>
            <div className={styles.qAGroupInner}>
                <div className={styles.frameParent}>
                    <div className={styles.circleUserParent}>
                        <img
                            className={styles.circleUserIcon}
                            loading="eager"
                            alt=""
                            src="/circleuser.svg"
                        />
                        <div className={styles.div2}>{board.userName}</div>
                    </div>
                    <div className={styles.chatting2Parent}>
                        <img
                            className={styles.chatting2Icon}
                            loading="eager"
                            alt=""
                            src="/chatting2.svg"
                        />
                        <div className={styles.div3}>댓글 : {board.commentCount}</div>
                    </div>
                    <div className={styles.vuesaxlineartimerParent}>
                        <img
                            className={styles.vuesaxlineartimerIcon}
                            loading="eager"
                            alt=""
                            src="/timer.svg"
                        />
                        <div className={styles.div4}>{timeCalculator(board.boardDate)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QAGroup;