import React from "react";
import "./style.css";
import QuillEditor from "./QuillEditor";
import {CustomToolbar} from "./CustomToolbar";
import FrameComponent from "./FrameComponet";

const WriteBoard = () => {
    return (
        <form className="writeboard">
            <FrameComponent
                prop="카테고리"
                prop1="카테고리를 선택해주세요."
                arrowDown2="/arrow-down.svg"
            />
            <FrameComponent
                prop="견종 목록"
                prop1="견종을 선택해주세요."
                arrowDown2="/arrow-down.svg"
            />
            <div className="frame-board">
                <div className="div">글 작성</div>
                <div className="input-frame">
                    <div className="search">
                        <input
                            className="input"
                            placeholder="제목을 입력해주세요."
                            type="text"
                        />
                    </div>
                    <button className="vector-parent">
                        <img className="frame-child" alt="" src="/inputBox.png"/>
                        <img className="edit-icon" alt="" src="/edit.svg"/>
                        <div className="div1">글 등록</div>
                    </button>
                </div>
                <div className="quill-editor-container">
                    <CustomToolbar/>
                    <QuillEditor/>
                </div>
            </div>
        </form>
    );
};

export default WriteBoard;