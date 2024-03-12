import React, {useState} from "react";
import styles from "./PostList.module.css"
import MissingShow from "./content/MissingShow";
import MissingWrite from "./content/MissingWrite";

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
                <div className={styles['footer-icon']} onClick={handleButtonClick}>
                    <img className={styles['footer-img']} src="/home.svg" alt="HOME"/>
                    <span color="darkGray"> 홈 </span>
                </div>
                <div className={styles['footer-icon']} onClick={handleButtonClick}>
                    <img className={styles['footer-img']} src="/pencil.svg" alt="PENCIL"/>
                    <span color="darkGray"> 글쓰기 </span>
                </div>
                <div className={styles['footer-icon']} onClick={handleButtonClick}>
                    <img className={styles['footer-img']} src="/user.svg" alt="user"/>
                    <span color="darkGray"> 내정보 </span>
                </div>
            </nav>
        </div>

    );
};
export default PostList;