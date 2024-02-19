import React from 'react';
import styles from "./FrameComponent.module.css";

const FrameComponent = () => {
    return (
        <div className={styles['frame-group']}>
            <div className={styles['frame-container']}>
                <div className={styles['user-circle-wrapper']}>
                    <div className={styles['user-circle']}>
                        <div className={styles.div2}>작성자</div>
                        <div className={styles['like-button']}>
                            <img
                                className={styles['circle-user-icon']}
                                loading="eager"
                                alt=""
                                src="/circleuser.svg"
                            />
                            <div className={styles.div3}>날짜</div>
                        </div>
                        <div className={styles['vector-y']}>
                            <div className={styles['vuesaxlinearlike-parent']}>
                                <img
                                    className={styles['vuesaxlinearlike-icon']}
                                    loading="eager"
                                    alt=""
                                    src="/like.svg"
                                />
                                <div className={styles.div4}>숫자</div>
                            </div>
                            <div className={styles['vuesaxlineardislike-parent']}>
                                <img
                                    className={styles['vuesaxlineardislike-icon']}
                                    loading="eager"
                                    alt=""
                                    src="/dislike.svg"
                                />
                                <div className={styles.wrapper}>
                                    <div className={styles.div5}>숫자</div>
                                </div>
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
            <div className={styles['comment-frame-wrapper']}>
                <div className={styles['comment-frame']}>
                    <h3 className={styles.h31}>댓글</h3>
                    <div className={styles.container}>
                        <div className={styles.div6}>숫자</div>
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
                                <div className={styles.div9}>작성자</div>
                            </div>
                            <div className={styles.div10}>댓글 내용</div>
                        </div>
                        <div className={styles.frame}>
                            <div className={styles.div11}>날짜</div>
                        </div>
                    </div>
                    <div className={styles['frame-wrapper']}>
                        <div className={styles['like-parent']}>
                            <div className={styles.like}>
                                <div className={styles['like-child']} />
                                <div className={styles.div12}>좋아요 0</div>
                            </div>
                            <div className={styles.like1}>
                                <div className={styles['like-item']} />
                                <div className={styles.div13}>싫어요 0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrameComponent;
