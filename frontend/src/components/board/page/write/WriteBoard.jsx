import React, {useState} from "react";
import styles from "./WriteBoard.module.css";
import QuillEditor from "./QuillEditor";
import {CustomToolbar} from "./CustomToolbar";
import FrameComponent from "./category";

const WriteBoard = () => {
    const [title, setTitle] = useState("");
    const [selectedDogBreed, setSelectedDogBreed] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [content, setContent] = useState("");
    const [boardType, setBoardType] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDogBreedSelected = (bread) => {
        setSelectedDogBreed(bread)
    }

    const handleBoardTypeSelected = (board) => {
        const boardTypeMap = {
            "일상": "DAILY",
            "정보": "INFO",
            "질문": "QUESTION"
        };
        setBoardType(boardTypeMap[board] || "");
    };
    // -------------------------- FrameComponent --------------------------
    const handleCategorySelected = (category) => {
        setSelectedCategory(category);
    };

    const dogBreeds = ["리트리버", "시베리안 허스키", "푸들", "불독"];

    // -------------------------- QuillEditor --------------------------
    const handleContentChange = (html) => {
        setContent(html);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postData = {
            boardCategory: selectedCategory,
            boardDogBreeds: selectedDogBreed,
            boardTitle: title,
            boardContent: content,
            boardType: boardType
        };
         // 테스트
        try {
            console.log(JSON.stringify(postData));
            const token = localStorage.getItem('userToken');
            const response = await fetch('http://localhost:8080/api/boardWrite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });
            if(response.ok) {
                console.log("글이 성공적으로 등록되었습니다.");
            } else {
                console.log("글 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("에러 발생: ", error)

        }
    };

    return (
        <form className={styles.writeboard} onSubmit={handleSubmit}>
            <FrameComponent
                prop="게시판"
                onSelect={handleBoardTypeSelected}
                arrowDown2="/arrow-down.svg"
                options={["일상","질문", "정보"]}
            />
            <FrameComponent
                prop="카테고리"
                onSelect={handleCategorySelected}
                arrowDown2="/arrow-down.svg"
                options={["개","고양이", "소동물", "기타"]}
            />
            {selectedCategory === "개" && (
                <FrameComponent
                    prop="견종 목록"
                    onSelect={handleDogBreedSelected}
                    arrowDown2="/arrow-down.svg"
                    options={dogBreeds}
                />
            )}

            <div className={styles["frame-board"]}>
                <div className={styles.div}>글 작성</div>
                <div className={styles["input-frame"]}>
                    <div className={styles.search}>
                        <input
                            className={styles.input}
                            placeholder="제목을 입력해주세요."
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <button type="submit" className={styles["vector-parent"]}>
                        <img className={styles["frame-child"]} alt="" src="/inputBox.png"/>
                        <img className={styles["edit-icon"]} alt="" src="/edit.svg"/>
                        <div className={styles.div1}>글 등록</div>
                    </button>
                </div>
                <div className={styles["quill-editor-container"]}>
                    <CustomToolbar/>
                    <QuillEditor onChange={handleContentChange}/>
                </div>
            </div>
        </form>
    );
};

export default WriteBoard;