import FrameComponent1 from "./components/FrameComponent1";
import FrameComponent from "./components/FrameComponent";
import styles from "./ShowBoard.module.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ShowBoard = () => {
    const {boardNo} = useParams();
    const [boardData, setBoardData] = useState(null);


    const fetchBoardData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/board/${boardNo}`);
            const data = await response.json();
            setBoardData(data);
        } catch (e) {
            console.error('board data ERROR : ', e);
        }
    };

    useEffect(() => {
        fetchBoardData();
    }, [boardNo]);

    if(!boardData) return <div>Loading...</div>
    return (
        <div className={styles.showboard}>
            <FrameComponent1 board={boardData} />
            <FrameComponent comments={boardData.comments} boardNo={boardNo} fetchBoardData={fetchBoardData}/>
        </div>
    );
};

export default ShowBoard;