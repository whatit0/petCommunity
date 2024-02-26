import React from 'react';
import styles from "./FrameComponent1.module.css";

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
const getCategoryByType = (boardCategory, boardDogBreeds) => {
    switch (boardCategory) {
        case '개':
            return boardDogBreeds;
        default:
            return boardCategory;
    }
}

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

const FrameComponent1 = ({board}) => {
    return (
        <div className={styles['frame-parent']}>
            <div className={styles['f-r-a-m-e-wrapper']}>
                <div className={styles['f-r-a-m-e']}>
                    <div className={styles['rectangle-parent']}>
                        <div className={styles['frame-child']}/>
                        <img className={styles['frame-item']}
                             alt=""
                             src={getImgByCategory(board.boardCategory)}/>
                        <div className={styles.div}>{getCategoryByType(board.boardCategory, board.boardDogBreeds)}</div>
                    </div>
                    <h3 className={styles.h3}>{board.boardTitle}</h3>
                </div>
            </div>
            <img
                className={styles['vertical-separator-icon']}
                loading="eager"
                alt=""
                src="/vector5.svg"
            />
            <div className={styles['content-frame']}>
                <div className={styles.div1}>글 내용</div>
            </div>


            <div className={styles['frame-container']}>
                <div className={styles['user-circle-wrapper']}>
                    <div className={styles['user-circle']}>
                        <div className={styles.div2}>{board.userName}</div>
                        <div className={styles['like-button']}>
                            <img
                                className={styles['circle-user-icon']}
                                loading="eager"
                                alt=""
                                src="/circleuser.svg"
                            />
                            <div className={styles.div3}>{timeCalculator(board.boardDate)}</div>
                        </div>
                        <div className={styles['vector-y']}>
                            <div className={styles['vuesaxlinearlike-parent']}>
                                <img
                                    className={styles['vuesaxlinearlike-icon']}
                                    loading="eager"
                                    alt=""
                                    src="/like.svg"
                                />
                                <div className={styles.div4}>{board.boardLike}</div>
                            </div>
                            <div className={styles['vuesaxlineardislike-parent']}>
                                <img
                                    className={styles['vuesaxlineardislike-icon']}
                                    loading="eager"
                                    alt=""
                                    src="/dislike.svg"
                                />
                                <div className={styles.div5}>{board.boardunLike}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    className={styles['frame-inner']}
                    loading="eager"
                    alt=""
                    src="/vector5.svg"
                />
            </div>

        </div>
    );
};

export default FrameComponent1;
