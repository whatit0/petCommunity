
const FrameG = () => {
    return (
        <div className="frame-g">
            <div className="vue-sax-linear-icons">
                <div className="number-frames">
                    <img
                        className="vuesaxlinearlike-icon"
                        loading="eager"
                        alt=""
                        src="/vuesaxlinearlike.svg"
                    />
                    <img
                        className="vuesaxlineardislike-icon"
                        loading="eager"
                        alt=""
                        src="/vuesaxlineardislike.svg"
                    />
                </div>
                <div className="container-frame">
                    <div className="div4">숫자</div>
                    <div className="div5">숫자</div>
                </div>
            </div>
            <div className="text-label">
                <img
                    className="content-text-icon"
                    loading="eager"
                    alt=""
                    src="/vector-6.svg"
                />
            </div>
            <div className="comment-frame">
                <div className="number-frame">
                    <div className="comment-frame1">
                        <h3 className="h31">댓글</h3>
                        <div className="comment-text">
                            <div className="div6">숫자</div>
                        </div>
                    </div>
                </div>
                <div className="input-frame">
                    <div className="rectangle-group">
                        <div className="frame-inner" />
                        <div className="input-field">
                            <div className="div7">댓글을 입력해주세요.</div>
                        </div>
                        <div className="registration-button">
                            <div className="registration-button-child" />
                            <div className="div8">등록</div>
                        </div>
                    </div>
                    <div className="rectangle-container">
                        <div className="rectangle-div" />
                        <div className="comment-frame2">
                            <div className="user-profile">
                                <div className="reply-content-frame">
                                    <img
                                        className="circle-user-icon1"
                                        loading="eager"
                                        alt=""
                                        src="/circleuser.svg"
                                    />
                                    <div className="div9">작성자</div>
                                </div>
                                <div className="div10">댓글 내용</div>
                            </div>
                            <div className="comment-input">
                                <div className="div11">날짜</div>
                            </div>
                        </div>
                        <div className="frame-like-dislike">
                            <div className="container-likes">
                                <div className="like">
                                    <div className="like-child" />
                                    <div className="div12">좋아요 0</div>
                                </div>
                                <div className="like1">
                                    <div className="like-item" />
                                    <div className="div13">싫어요 0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrameG;