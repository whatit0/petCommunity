import React from "react";
import styles from "./PostList.module.css"
import MissingShow from "./conten;t/MissingShow";

const PostList = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['logo']}>
                실종 신고 센터
            </div>
            <div className={styles['content']}>
                <MissingShow></MissingShow>
            </div>
            <nav className={styles['footer']}>
                <button> 글 쓰 기 </button>
            </nav>
        </div>

    );
};
export default PostList;