import React, {useEffect, useRef, useState} from "react";
import styles from "./MissingWrite.module.css"
import { storage } from "../../chat/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const MissingWrite = ({selectedLocation}) => {
    const fileInputRef = useRef();
    const [selectedValue, setSelectedValue] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [placeContent, setPlaceContent] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setInputAddress(selectedLocation.address || "");
    }, [selectedLocation.address]);

    const handlePlaceNameChange = (event) => {
        setPlaceName(event.target.value);
    };

    const handlePlaceContentChange = (event) => {
        setPlaceContent(event.target.value);
    }

    const handleAddressChange = (event) => {
        setInputAddress(event.target.value);
    };
    const handleButtononClick = () => {
        fileInputRef.current.click();
    };
    const handleOptionChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const uploadImageToFirebase = async (file) => {
        const storageRef = ref(storage, `missing/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // 업로드 진행 상태
                },
                (error) => {
                    console.error("Upload error: ", error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(uploading) return; // 이미 업로드 중이라면 추가 제출 방지

        let photoUrl = "";
        setUploading(true);
        if (!selectedValue) {
            alert('견종을 선택해주세요.');
            return; // 함수 실행 종료
        }

        if (fileInputRef.current.files[0]) {
            try {
                photoUrl = await uploadImageToFirebase(fileInputRef.current.files[0]);
                console.log("Uploaded photo URL:", photoUrl);
            } catch (error) {
                console.error("Failed to upload photo:", error);
                setUploading(false);
                alert('이미지 업로딩 실패!!');
                return;
            }
        }

        const postData = {
            missingPlaceName: placeName,
            missingLocationAddress: inputAddress,
            missingPetType: selectedValue,
            missingDescription: placeContent,
            missingPhotoUrl: photoUrl,
            missingLat: selectedLocation.lat,
            missingLng: selectedLocation.lng
        };

        try {
            console.log(JSON.stringify(postData));
            const token = localStorage.getItem('userToken');
            const response = await fetch('http://localhost:8080/api/missingWrite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });
            if (response.ok) {
                console.log("글 작성 완료");
                alert('글 작성 완료.');
            } else {
                console.log("실패");
            }
        } catch (error) {
            console.error("에러 발생 : ", error);
        }
        setUploading(false); // 업로드 완료
    };

    return (
        <form className={styles['form-container']} onSubmit={handleSubmit}>
            <div className={styles['container']}>

                <section>
                    <span className={styles['span-title']}> 장소 이름 </span>
                    <div className={styles['input-container']}>
                        <input className={styles['input-style']}
                               placeholder="30글자 이내로 장소의 이름을 입력해주세요."
                               tabIndex="1"
                               maxLength="30"
                               value={placeName}
                               onChange={handlePlaceNameChange}
                        />
                        <span className={styles['span-inputSize']}>{placeName.length}/30</span>
                    </div>
                </section>

                <section>
                    <span className={styles['span-title']}> 실종 위치 </span>
                    <input type="text"
                           className={styles['input-style']}
                           placeholder="장소를 직접 입력하거나 지도에서 클릭하세요."
                           value={inputAddress}
                           onChange={handleAddressChange}/>
                </section>

                <section>
                    <span className={styles['span-title']}> 견종 </span>
                    <div className={styles['input-container']}>
                        <select value={selectedValue} onChange={handleOptionChange} className={styles['input-style']}>
                            <option value="">견종을 선택해주세요.</option>
                            <option value="개">개</option>
                            <option value="고양이">고양이</option>
                            <option value="소 동물">소 동물</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                </section>

                <section>
                    <span className={styles['span-title']}> 설명 </span>
                    <div className={styles['input-container']}>
                        <textarea className={styles['text-style']}
                                  placeholder="1000자 이내로 장소 설명과 애견의 생김새를 입력해주세요."
                                  tabIndex="3"
                                  maxLength="1000"
                                  value={placeContent}
                                  onChange={handlePlaceContentChange}
                        />
                        <span className={styles['span-inputSize2']}>{placeContent.length}/1000</span>
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
                        <img src="/picture.svg" alt="Upload"/>
                    </button>
                </section>

                <section>
                    <div className={styles['button-div']}>
                        <button type="submit" className={styles['button-submit']}>작성하기</button>
                        <div className={styles['button-margin']}></div>
                        <button className={styles['button-cancel']}>취소하기</button>
                    </div>
                </section>

                <section>
                </section>

            </div>
        </form>
    );
};
export default MissingWrite;