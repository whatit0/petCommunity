import React from "react";
import styles from "./MissingWrite.module.css"

const MissingWrite = () => {
    return (
        <div className={styles['container']}>
            <div>
                제목
            </div>
            <input/>

            <div>
                실종 위치
            </div>
            <input/>

            <div>
                실종 설명
            </div>
            <input/>
        </div>
    );
};
export default MissingWrite;