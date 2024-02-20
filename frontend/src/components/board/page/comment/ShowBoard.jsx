import FrameComponent1 from "./components/FrameComponent1";
import FrameComponent from "./components/FrameComponent";
import styles from "./ShowBoard.module.css";

const ShowBoard = () => {
    return (
        <div className={styles.showboard}>
            <FrameComponent1 />
            <FrameComponent />
        </div>
    );
};

export default ShowBoard;