import React from "react";
import "./style.css";
import QuillEditor from "./QuillEditor";
import {CustomToolbar} from "./CustomToolbar";
const WriteBoard = () => {
    return (
        <div className="write-board">
            <div className="div">
                <div className="text-wrapper">카테고리</div>
                <div className="text-wrapper-2">견종 목록</div>
                <div className="text-wrapper-3">글 작성</div>
                <div className="search">
                    <div className="text-wrapper-4">제목을 입력해주세요.</div>
                </div>
                <div className="overlap-group-wrapper">
                    <div className="overlap-group">
                        <div className="text-wrapper-5">견종을 선택해주세요.</div>
                        <img className="arrow-down" alt="Arrow down" src="/arrow-down.svg" />
                    </div>
                </div>
                <div className="overlap-wrapper">
                    <div className="overlap">
                        <div className="text-wrapper-6">카테고리를 선택해주세요.</div>
                        <img className="img" alt="Arrow down" src="/arrow-down.svg" />
                    </div>
                </div>
                <div className="group">
                    <div className="overlap-2">
                        <div className="text-wrapper-7">글 등록</div>
                        <img className="edit" alt="Edit" src="/edit.svg" />
                    </div>
                </div>
                <div className="quill-editor-container">
                    <CustomToolbar />
                    <QuillEditor/>
                </div>
            </div>
        </div>
    );
};

export default WriteBoard;