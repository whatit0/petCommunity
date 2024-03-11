
import React, {useEffect, useState} from "react";

const MapContainer = ({ onLocationSelect }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(37.5665, 126.9780),
            zoom: 10
        };

        const map = new window.naver.maps.Map('map', mapOptions);
        setMap(map);

        window.naver.maps.Event.addListener(map, 'click', function (e) {
            const lat = e.coord.lat(); // 위도
            const lng = e.coord.lng(); // 경도

            // 기존 카머가 있다면 삭제
            if (marker) {
                marker.setMap(null);
            }

            //새 마커 생성 및 지도에 추가
            const newMarker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(lat, lng),
                map: map
            });
            setMarker(newMarker);

            //선택된 위치의 좌표를 상위 컴포넌트로 전달
            onLocationSelect({lat, lng});
        });
    }, [onLocationSelect, marker]);
    return (
        <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    );
};
export default MapContainer;