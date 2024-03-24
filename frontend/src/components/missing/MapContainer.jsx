import React, { useEffect, useState } from "react";

const MapContainer = ({ onLocationSelect, selectedUserLocation }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        // 네이버 지도 API 스크립트가 로드되었는지 확인
        if (window.naver && window.naver.maps) {
            if (!map) {
                const mapOptions = {
                    center: new window.naver.maps.LatLng(37.5665, 126.9780),
                    zoom: 10,
                };
                const newMap = new window.naver.maps.Map('map', mapOptions);
                setMap(newMap);
            }

            if (map) {
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

                    // reverseGeocode 호출 전에 naver.maps.Service 객체가 있는지 확인
                    if (window.naver.maps.Service) {
                        window.naver.maps.Service.reverseGeocode({
                            coords: new window.naver.maps.LatLng(lat, lng),
                            orders: [
                                window.naver.maps.Service.OrderType.ADDR,
                                window.naver.maps.Service.OrderType.ROAD_ADDR
                            ].join(',')
                        }, function (status, response) {
                            if (status !== window.naver.maps.Service.Status.OK) {
                                return alert('주소를 찾지 못했습니다.')
                            }

                            var result = response.v2,
                                item = result.address;

                            onLocationSelect({ lat, lng, address: item.jibunAddress || item.roadAddress });
                            return alert('Address ' + item.jibunAddress);
                        });
                    } else {
                        console.error('naver.maps.Service 객체를 찾을 수 없습니다.');
                    }
                });

                // 클린업 함수에서 이벤트 리스너 제거
                return () => {
                    window.naver.maps.Event.removeListener(clickListener);
                };
            }
        } else {
            console.error('naver 객체가 정의되지 않았거나 네이버 지도 API가 로드되지 않았습니다.');
        }
    }, [map, onLocationSelect, marker]); // 의존성 배열 수정

    useEffect(() => {
        if (map && selectedUserLocation.lat && selectedUserLocation.lng) {
            // 지정된 위치로 지도 중심 이동
            const newPosition = new window.naver.maps.LatLng(selectedUserLocation.lat, selectedUserLocation.lng);
            map.setCenter(newPosition);
            map.setZoom(15); // 원하는 확대 수준으로 설정

            // 기존 마커 제거
            if (marker) {
                marker.setMap(null);
            }

            // 새 위치에 마커 생성
            const newMarkerOption = {
                position: newPosition,
                map: map,
                icon: {
                    content: '<img src="/dog.svg" alt="마커 아이콘" style="width:30px; height:30px;"/>',
                    size: new window.naver.maps.Size(33, 33),
                    origin: new window.naver.maps.Point(0, 0),
                    anchor: new window.naver.maps.Point(10, 10)
                }
            };
            const newMarker = new window.naver.maps.Marker(newMarkerOption);
            setMarker(newMarker);
        }
    }, [selectedUserLocation, map]);

    return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapContainer;
