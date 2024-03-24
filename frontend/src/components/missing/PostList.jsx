import React, {useState} from "react";
import styles from "./PostList.module.css"
import MissingShow from "./content/MissingShow";
import MissingWrite from "./content/MissingWrite";

const PostList = ({missingPosts, selectedLocation, onRefresh, onSelectPost}) => {

    const [view, setView] = useState("show");

    const handleButtonClick = (newView) => {
        setView(newView);
        if(newView === "show") {
            onRefresh();
        }
    };

    return (
        <div className={styles['container']}>
            <div className={styles['logo']}>
                실종 신고 센터
            </div>
            <div className={styles['content']}>
                {
                    view === "show" ?
                    missingPosts.map((post, index) => (
                        <MissingShow key={index} post={post} onSelect={onSelectPost}/>
                    )):
                    <MissingWrite selectedLocation={selectedLocation}/>
                }
            </div>
            <nav className={styles['footer']}>
                <div className={styles['footer-icon']} onClick={() => handleButtonClick("show")}>
                    <img className={styles['footer-img']} src="/home.svg" alt="HOME"/>
                    <span color="darkGray"> 홈 </span>
                </div>
                <div className={styles['footer-icon']} onClick={() => handleButtonClick("write")}>
                    <img className={styles['footer-img']} src="/pencil.svg" alt="PENCIL"/>
                    <span color="darkGray"> 글쓰기 </span>
                </div>
                <div className={styles['footer-icon']} onClick={() => handleButtonClick("show")}>
                    <img className={styles['footer-img']} src="/user.svg" alt="user"/>
                    <span color="darkGray"> 내정보 </span>
                </div>
            </nav>
        </div>

    );
};
export default PostList;