import "./FrameComponent1.css";

const FrameComponent1 = () => {
    return (
        <div className="frame-parent">
            <div className="f-r-a-m-e-wrapper">
                <div className="f-r-a-m-e">
                    <button className="rectangle-parent">
                        <div className="frame-child" />
                        <img className="frame-item" alt="" src="/dog.svg" />
                        <div className="div">견종</div>
                    </button>
                    <h3 className="h3">제목</h3>
                </div>
            </div>
            <img
                className="vertical-separator-icon"
                loading="eager"
                alt=""
                src="/vector5.svg"
            />
            <div className="content-frame">
                <div className="div1">글 내용</div>
            </div>
        </div>
    );
};

export default FrameComponent1;