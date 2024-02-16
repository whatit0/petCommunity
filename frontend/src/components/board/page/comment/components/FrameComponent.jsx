import "./FrameComponent.css";

const FrameComponent = () => {
    return (
        <div className="frame-group">
            <div className="frame-container">
                <div className="user-circle-wrapper">
                    <div className="user-circle">
                        <div className="div2">작성자</div>
                        <div className="like-button">
                            <img
                                className="circle-user-icon"
                                loading="eager"
                                alt=""
                                src="/circleuser.svg"
                            />
                            <div className="div3">날짜</div>
                        </div>
                        <div className="vector-y">
                            <div className="vuesaxlinearlike-parent">
                                <img
                                    className="vuesaxlinearlike-icon"
                                    loading="eager"
                                    alt=""
                                    src="/like.svg"
                                />
                                <div className="div4">숫자</div>
                            </div>
                            <div className="vuesaxlineardislike-parent">
                                <img
                                    className="vuesaxlineardislike-icon"
                                    loading="eager"
                                    alt=""
                                    src="/dislike.svg"
                                />
                                <div className="wrapper">
                                    <div className="div5">숫자</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    className="frame-inner"
                    loading="eager"
                    alt=""
                    src="/vector5.svg"
                />
            </div>
            <div className="comment-frame-wrapper">
                <div className="comment-frame">
                    <h3 className="h31">댓글</h3>
                    <div className="container">
                        <div className="div6">숫자</div>
                    </div>
                </div>
            </div>
            <div className="frame-div">
                <div className="rectangle-group">
                    <div className="rectangle-div" />
                    <div className="input-field">
                        <div className="div7">댓글을 입력해주세요.</div>
                    </div>
                    <div className="registration-button">
                        <div className="registration-button-child" />
                        <div className="div8">등록</div>
                    </div>
                </div>
                <div className="rectangle-container">
                    <div className="frame-child1" />
                    <div className="user-profile-parent">
                        <div className="user-profile">
                            <div className="circle-user-parent">
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
                        <div className="frame">
                            <div className="div11">날짜</div>
                        </div>
                    </div>
                    <div className="frame-wrapper">
                        <div className="like-parent">
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
    );
};

export default FrameComponent