import FrameParent from "../components/FrameParent";
import FrameG from "../components/FrameG";
import "./ShowBoard.css";

const ShowBoard = () => {
    return (
        <div className="showboard">
            <FrameParent />
            <FrameG />
        </div>
    );
};

export default ShowBoard;