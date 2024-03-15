import React from "react";
import styles from "./MissingShow.module.css"

const MissingShow = () => {
    return (
        <li className={styles['li-container']}>
            <div className={styles['li-title']}> 리트리버 </div>
            <div className={styles['li-address']}> 주소 </div>
            <div className={styles['li-content']}> 내용 </div>
        </li>
    );
};
export default MissingShow;