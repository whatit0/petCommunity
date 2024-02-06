import React, {useState} from "react";
import "./style.css";
import QuillEditor from "./QuillEditor";
import {CustomToolbar} from "./CustomToolbar";
import FrameComponent from "./FrameComponet";

const WriteBoard = () => {
    const [title, setTitle] = useState("");
    const [selectedDogBreed, setSelectedDogBreed] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDogBreedSelected = (bread) => {
        setSelectedDogBreed(bread)
    }
    // -------------------------- FrameComponent --------------------------
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategorySelected = (category) => {
        setSelectedCategory(category);
    };

    const dogBreeds = ["리트리버", "시베리안 허스키", "푸들", "불독"];

    // -------------------------- QuillEditor --------------------------
    const [content, setContent] = useState("");

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postData = {
            category: selectedCategory,
            dogBreeds: selectedDogBreed,
            title: title,
            content: content,
        };

        try {
            const response = await fetch('http://localhost:8080/api/writeBoard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
        <form className="writeboard" onSubmit={handleSubmit}>
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

            <div className="frame-board">
                <div className="div">글 작성</div>
                <div className="input-frame">
                    <div className="search">
                        <input
                            className="input"
                            placeholder="제목을 입력해주세요."
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <button type="submit" className="vector-parent">
                        <img className="frame-child" alt="" src="/inputBox.png"/>
                        <img className="edit-icon" alt="" src="/edit.svg"/>
                        <div className="div1">글 등록</div>
                    </button>
                </div>
                <div className="quill-editor-container">
                    <CustomToolbar/>
                    <QuillEditor onChange={handleContentChange}/>
                </div>
            </div>
        </form>
    );
};

export default WriteBoard;