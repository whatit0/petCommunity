import React, {useState} from "react";
import styles from "./PostList.module.css"
import MissingShow from "./conten;t/MissingShow";
import MissingWrite from "./conten;t/MissingWrite";

const PostList = () => {

    const [view, setView] = useState("show");

    const handleButtonClick = () => {
        setView(view === "show" ? "write" : "show");
    };

    return (
        <div className={styles['container']}>
            <div className={styles['logo']}>
                실종 신고 센터
            </div>
            <div className={styles['content']}>
                {view === "show" ? <MissingShow /> : <MissingWrite />}
            </div>
            <nav className={styles['footer']}>
                <button onClick={handleButtonClick}> 글 쓰 기 </button>
            </nav>
        </div>

    );
};
export default PostList;