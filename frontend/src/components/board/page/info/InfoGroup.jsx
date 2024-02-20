import styles from "../qa/QAGroup.module.css";

const InfoGroup = () => {
    return (
        <div className={styles.qAGroup}>
            <div className={styles.qAGroupChild} />
            <div className={styles.infoBox}>
                <div className={styles.qaParent}>
                    <div className={styles.qa}>{`정보`}</div>
                    <div className={styles.rectangleParent}>
                        <div className={styles.frameChild} />
                        <img
                            className={styles.frameItem}
                            loading="eager"
                            alt=""
                            src="/dog.svg"
                        />
                        <div className={styles.div}>강아지</div>
                    </div>
                </div>
                <div className={styles.div1}>
                    저희 집 강아지가 3일동안 밥을 안먹고있습니다.
                </div>
            </div>
            <div className={styles.qAGroupInner}>
                <div className={styles.frameParent}>
                    <div className={styles.circleUserParent}>
                        <img
                            className={styles.circleUserIcon}
                            loading="eager"
                            alt=""
                            src="/circleuser.svg"
                        />
                        <div className={styles.div2}>성호</div>
                    </div>
                    <div className={styles.chatting2Parent}>
                        <img
                            className={styles.chatting2Icon}
                            loading="eager"
                            alt=""
                            src="/chatting2.svg"
                        />
                        <div className={styles.div3}>댓글 : 0</div>
                    </div>
                    <div className={styles.vuesaxlineartimerParent}>
                        <img
                            className={styles.vuesaxlineartimerIcon}
                            loading="eager"
                            alt=""
                            src="/timer.svg"
                        />
                        <div className={styles.div4}>2시간 전</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoGroup;