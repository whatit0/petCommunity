import React, {useState} from 'react';
import styles from "./FrameComponent.module.css";

const FrameComponent = ({comments, boardNo, fetchBoardData }) => {

    const [commentContent, setCommentContent] = useState('');

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

    const handleCommentSubmit = async () => {
        const commentData = {
            commentContent: commentContent,
            boardNo: boardNo
        };

        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('http://localhost:8080/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(commentData),
            });

            if (!response.ok) {
                throw new Error('댓글 등록에 실패했습니다.');
            }
            setCommentContent('');
            await fetchBoardData();
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className={styles['frame-group']}>



            <div className={styles['comment-frame-wrapper']}>
                <div className={styles['comment-frame']}>
                    <h3 className={styles.h31}>댓글</h3>
                    <div className={styles.container}>
                        <div className={styles.div6}>{comments.length}</div>
                    </div>
                </div>
            </div>
            <div className={styles['frame-div']}>
                <div className={styles['rectangle-group']}>
                    <div className={styles['rectangle-div']} />
                    <input
                        type="text"
                        className={styles['input-field']} // 기존 div의 클래스를 사용
                        placeholder="댓글을 입력해주세요."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <div className={styles['registration-button']}>
                        <div className={styles['registration-button-child']}/>
                        <button className={styles.div8}
                             onClick={handleCommentSubmit}
                        >등록
                        </button>
                    </div>
                </div>
                {comments.map((comment, index) => (
                <div className={styles['rectangle-container']} key={comment.commentNo}>
                    <div className={styles['frame-child1']} />
                    <div className={styles['user-profile-parent']}>
                        <div className={styles['user-profile']}>
                            <div className={styles['circle-user-parent']}>
                                <img
                                    className={styles['circle-user-icon1']}
                                    loading="eager"
                                    alt=""
                                    src="/circleuser.svg"
                                />
                                <div className={styles.div9}>{comment.userName}</div>
                            </div>
                            <div className={styles.div10}>{comment.commentContent}</div>
                        </div>
                        <div className={styles.frame}>
                            <div className={styles.div11}>{timeCalculator(comment.commentDate)}</div>
                        </div>
                    </div>
                    <div className={styles['frame-wrapper']}>
                        <div className={styles['like-parent']}>
                            <div className={styles.like}>
                                <div className={styles['like-child']} />
                                <div className={styles.div12}>좋아요 {comment.commentLike}</div>
                            </div>
                            <div className={styles.like1}>
                                <div className={styles['like-item']} />
                                <div className={styles.div13}>싫어요 {comment.commentunLike}</div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default FrameComponent;
