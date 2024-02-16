import FrameComponent1 from "./components/FrameComponent1";
import FrameComponent from "./components/FrameComponent";
import "./ShowBoard.css";

const ShowBoard = () => {
    return (
        <div className="showboard">
            <FrameComponent1 />
            <FrameComponent />
        </div>
    );
};

export default ShowBoard;