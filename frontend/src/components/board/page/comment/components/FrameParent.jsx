import "./FrameParent.css";

const FrameParent = () => {
    return (
        <div className="frame-parent">
            <div className="inner-frame">
                <div className="f-r-a-m-e">
                    <button className="rectangle-parent">
                        <div className="frame-child" />
                        <img className="frame-item" alt="" src="/group-6.svg" />
                        <div className="div">견종</div>
                    </button>
                    <h3 className="h3">제목</h3>
                </div>
            </div>
            <div className="main-frame">
                <div className="sub-frame">
                    <div className="user-interaction">
                        <img
                            className="circle-user-icon"
                            loading="eager"
                            alt=""
                            src="/circleuser.svg"
                        />
                        <div className="div1">작성자</div>
                    </div>
                    <div className="div2">날짜</div>
                </div>
            </div>
            <div className="text-container">
                <img
                    className="vertical-separator-icon"
                    loading="eager"
                    alt=""
                    src="/vector-5.svg"
                />
            </div>
            <div className="content-frame">
                <div className="div3">글 내용</div>
            </div>
        </div>
    );
};

export default FrameParent;