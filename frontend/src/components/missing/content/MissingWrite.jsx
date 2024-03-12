import React, {useRef} from "react";
import styles from "./MissingWrite.module.css"

const MissingWrite = () => {
    const fileInputRef = useRef();
    const handleButtononClick = () => {
        fileInputRef.current.click();
    }
    return (
        <form className={styles['form-container']}>
            <div className={styles['container']}>
                <section>
                    <span className={styles['span-title']}> 장소 이름 </span>
                    <div className={styles['input-container']}>
                        <input className={styles['input-style']} placeholder="30글자 이내로 장소의 이름을 입력해주세요." tabIndex="1"
                               maxLength="30"/>
                        <span className={styles['span-inputSize']}>0/30</span>
                    </div>
                </section>

                <section>
                    <span className={styles['span-title']}> 실종 위치 </span>
                    <input type="text" className={styles['input-style']} placeholder="장소를 직접 입력하거나 지도에서 클릭하세요."/>
                </section>

                <section>
                    <span className={styles['span-title']}> 설명 </span>
                    <div className={styles['input-container']}>
                        <textarea className={styles['text-style']} placeholder="1000자 이내로 장소 설명과 애견의 생김새를 입력해주세요."
                                  tabIndex="3"
                                  maxLength="1000"/>
                        <span className={styles['span-inputSize2']}>0/1000</span>
                    </div>
                </section>

                <section>
                    <span className={styles['span-title']}> 애견 사진 </span>
                    <span className={styles['span-description']}> 실종된 애견에 대한 사진을 추가해주세요. </span>
                    <input type="file"
                           ref={fileInputRef}
                           style={{display: "none"}}
                           onChange={(e) => console.log(e.target.files)}
                    />
                    <button onClick={handleButtononClick} type="button" className={styles['file-upload-button']}>
                        <img src="/picture.svg" alt="Upload" />
                    </button>
                </section>
            </div>
        </form>
    );
};
export default MissingWrite;