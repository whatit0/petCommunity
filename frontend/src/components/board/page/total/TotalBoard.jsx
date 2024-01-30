import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import QAGroup from "../qa/QAGroup";
import DailyGroup from "../daily/DailyGroup";
import InfoGroup from "../info/InfoGroup";
import WriteBoard from "../write/WriteBoard";
import styles from "./TotalBoard.module.css";

const TotalBoard = () => {
    const [selectedTap, setSelectedTab] = useState('all'); // 초기 탭 상태는 all [all, qa, daily, info]

    const getTabClassName = (tabName) => {
        return selectedTap === tabName ? `${styles.div} ${styles.selectedTab}` : styles.div;
    };


    return (
        <div className={styles.desktop2}>
            <nav className={styles.parent}>
                <div className={getTabClassName('all')} onClick={() => setSelectedTab('all')}>전체</div>
                <div className={getTabClassName('qa')} onClick={() => setSelectedTab('qa')}>Q&A</div>
                <div className={getTabClassName('daily')} onClick={() => setSelectedTab('daily')}>일상</div>
                <div className={getTabClassName('info')} onClick={() => setSelectedTab('info')}>정보</div>
            </nav>
            <div className={styles.frameSearch}>
                <div className={styles.search}>
                    <div className={styles.searchChild}/>
                    <img className={styles.search2Icon} alt="" src="/search2.svg"/>
                    <input
                        className={styles.input}
                        placeholder="찾으시는 커뮤니티 글을 입력해주세요."
                        type="text"
                    />
                </div>
                <div className={styles.checkboxPair}>
                    <div className={styles.frameParent}>
                        <div className={styles.checkboxOnParent}>
                            <input className={styles.checkboxOn} type="checkbox"/>
                            <div className={styles.useAsThe}>최신순</div>
                        </div>
                        <div className={styles.checkboxOnGroup}>
                            <input className={styles.checkboxOn1} type="checkbox"/>
                            <div className={styles.useAsThe1}>인기순</div>
                        </div>
                    </div>
                    <Link to="/write" className={styles.vectorParent}>
                        <img className={styles.editIcon} alt="" src="/edit.svg"/>
                        <div className={styles.divWrite}>글쓰기</div>
                    </Link>
                </div>
            </div>
            <div className={styles.qAGroupParent}>
                {selectedTap === 'all' && <><QAGroup/><DailyGroup/><InfoGroup/></>}
                {selectedTap === 'qa' && <QAGroup/>}
                {selectedTap === 'daily' && <DailyGroup/>}
                {selectedTap === 'info' && <InfoGroup/>}
                <div className={styles.reasonUnknown}>
                    <div className={styles.div3}>
                        이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                        이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                        이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                        이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                        이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                        이유는 나도 모릅니다. 이유는 나도 모릅니다. 이유는 나도 모릅니다.
                        이유는 ....
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalBoard;
