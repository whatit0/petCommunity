import React, {useEffect, useState} from "react";
import styles from "./MissingMain.module.css";
import MapContainer from "./MapContainer";
import PostList from "./PostList";

const MissingMain = () => {
    const [selectedLocation, setSelectedLocation] = useState({ lat:null, lng: null, address:null});
    const [selectedUserLocation, setSelectedUserLocation] = useState({lat:null, lng:null});
    const [missingPosts, setMissingPosts] = useState([]);

    const fetchMissingPosts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/getMissing");
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            const data = await response.json();
            setMissingPosts(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchMissingPosts();
    }, []);

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        console.log("선택된 위치:", location);
    }

    const handleSelectPost = (lat, lng) => {
        setSelectedUserLocation({ lat, lng });
    };

    return (
        <div className={styles['main-container']}>
            <div className={styles['posts-section']}>
                <PostList
                    missingPosts={missingPosts}
                    selectedLocation={selectedLocation}
                    onRefresh={fetchMissingPosts}
                    onSelectPost={handleSelectPost}
                />
            </div>
            <div className={styles['map-section']}>
                <MapContainer
                    onLocationSelect={handleLocationSelect}
                    selectedUserLocation={selectedUserLocation}
                />
            </div>

        </div>
    );
};
export default MissingMain;