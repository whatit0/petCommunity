import { useMemo } from "react";
import "./FrameComponet.css"

const FrameComponent = ({
                            prop,
                            prop1,
                            arrowDown2,
                        }) => {

    return (
        <div className="frame-board1">
            <div className="category-frame">
                <div className="div2">{prop}</div>
                <div className="search1" >
                    <div className="main-frame">
                        <div className="div3">
                            {prop1}
                        </div>
                    </div>
                    <img className="arrow-down-2-icon" alt="" src={arrowDown2} />
                </div>
            </div>
        </div>
    );
};

export default FrameComponent;