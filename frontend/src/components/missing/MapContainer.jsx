import React, { useEffect, useState } from "react";

const MapContainer = ({ onLocationSelect }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (!map) { // 지도가 아직 생성되지 않았다면
            const mapOptions = {
                center: new window.naver.maps.LatLng(37.5665, 126.9780),
                zoom: 10,
            };
            const newMap = new window.naver.maps.Map('map', mapOptions);
            setMap(newMap);
        }

        if (map) { // 지도가 생성된 후에 이벤트 리스너를 추가
            const clickListener = window.naver.maps.Event.addListener(map, 'click', function (e) {
                const lat = e.coord.lat();
                const lng = e.coord.lng();

                if (marker) {
                    marker.setMap(null);
                }
                const markerOption = {
                    position: new window.naver.maps.LatLng(lat, lng),
                    map: map,
                    icon: {
                        content: '<img src="/dog.svg" alt="마커 아이콘" style="width:30px; height:30px;"/>',
                        size: new window.naver.maps.Size(33, 33),
                        origin: new window.naver.maps.Point(0, 0),
                        anchor: new window.naver.maps.Point(10, 10)
                    }
                };
                const newMarker = new window.naver.maps.Marker(markerOption);
                setMarker(newMarker);

                onLocationSelect({ lat, lng });
            });

            // 클린업 함수에서 이벤트 리스너 제거
            return () => {
                window.naver.maps.Event.removeListener(clickListener);
            };
        }
    }, [map, onLocationSelect, marker]); // 의존성 배열 수정

    return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapContainer;
