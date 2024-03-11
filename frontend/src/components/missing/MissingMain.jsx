import React, {useState} from "react";
import styles from "./MissingMain.module.css";
import MapContainer from "./MapContainer";
import PostList from "./PostList";

const MissingMain = () => {
    const [selectedLocation, setSelectedLocation] = useState({ lat:null, lng: null});

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);

        console.log("선택된 위치:", location);
    }

    return (
        <div className={styles['main-container']}>
            <div className={styles['posts-section']}>
                <PostList />
            </div>
            <div className={styles['map-section']}>
                <MapContainer onLocationSelect={handleLocationSelect}/>
            </div>

        </div>
    );
};
export default MissingMain;