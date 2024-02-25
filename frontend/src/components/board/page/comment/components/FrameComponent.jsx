import React from 'react';
import styles from "./FrameComponent.module.css";

const FrameComponent = ({comments}) => {
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
                    <div className={styles['input-field']}>
                        <div className={styles.div7}>댓글을 입력해주세요.</div>
                    </div>
                    <div className={styles['registration-button']}>
                        <div className={styles['registration-button-child']} />
                        <div className={styles.div8}>등록</div>
                    </div>
                </div>
                {comments.map((comment, index) => (
                <div className={styles['rectangle-container']}>
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
                            <div className={styles.div11}>날짜</div>
                        </div>
                    </div>
                    <div className={styles['frame-wrapper']}>
                        <div className={styles['like-parent']}>
                            <div className={styles.like}>
                                <div className={styles['like-child']} />
                                <div className={styles.div12}>{comment.commentLike}</div>
                            </div>
                            <div className={styles.like1}>
                                <div className={styles['like-item']} />
                                <div className={styles.div13}>{comment.commentunLike}</div>
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
