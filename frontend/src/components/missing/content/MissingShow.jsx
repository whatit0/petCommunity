import React, {useEffect, useState} from "react";
import styles from "./MissingShow.module.css"

const MissingShow = ({post, onSelect}) => {

    const handleClick = () => {
        onSelect(post.missingLat, post.missingLng);
    }

    return (
        <li className={styles['li-container']} onClick={handleClick}>
            <div className={styles['li-title']}> {post.missingPetType}</div>
            <div className={styles['li-address']}> {post.missingPlaceName}</div>
            <div className={styles['li-address']}> {post.missingLocationAddress}</div>
            <div className={styles['li-content']}> {post.missingDescription}</div>
            <div className={styles['li-address']}> {post.missingUserName}</div>
        </li>
    );
};
export default MissingShow;