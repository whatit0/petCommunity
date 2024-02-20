import React from 'react';
import styles from "./FrameComponent1.module.css";

const FrameComponent1 = () => {
    return (
        <div className={styles['frame-parent']}>
            <div className={styles['f-r-a-m-e-wrapper']}>
                <div className={styles['f-r-a-m-e']}>
                    <button className={styles['rectangle-parent']}>
                        <div className={styles['frame-child']} />
                        <img className={styles['frame-item']} alt="" src="/dog.svg" />
                        <div className={styles.div}>견종</div>
                    </button>
                    <h3 className={styles.h3}>제목</h3>
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
        </div>
    );
};

export default FrameComponent1;
