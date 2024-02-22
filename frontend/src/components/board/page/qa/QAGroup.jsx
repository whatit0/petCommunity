import styles from "./QAGroup.module.css";
import React from "react";
import {useNavigate} from "react-router-dom";

const QAGroup = ({board}) => {

    const navigate = useNavigate();

    const handleBoardClick = (boardNo) => {
        navigate(`/board/${boardNo}`);
    }

    return (
        <div className={styles.qAGroup} onClick={() => handleBoardClick(board.boardNo)}>
            <div className={styles.qAGroupChild}/>
            <div className={styles.infoBox}>
                <div className={styles.qaParent}>
                    <div className={styles.qa}>{`Q&A`}</div>
                    <div className={styles.rectangleParent}>
                        <div className={styles.frameChild}/>
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
                    {board.boardTitle}
                </div>
                <div className={styles.contentdiv}>
                    이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                    이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                    이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                    이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                    이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                    이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                    이유는 ....
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

export default QAGroup;