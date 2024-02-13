import React, { useEffect, useRef } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

const PetHospital = () => {
    const mapElement = useRef(null);
    const navermaps = useNavermaps();

    useEffect(() => {
        const fetchAnimalHospitals = async () => {
            try {
                const apiKey = 'a22abd54f4a548d3b47530eb8dec0bb6';
                const type = 'json';
                const pSize = 1000;
                const totalSize = 2810;
                const totalPages = Math.ceil(totalSize / pSize);

                const markers = [];

                for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
                    const apiUrl = `https://openapi.gg.go.kr/Animalhosptl?KEY=${apiKey}&Type=${type}&pIndex=${pageIndex}&pSize=${pSize}`;
                    const response = await fetch(apiUrl);
                    const data = await response.json();

                    if (!data.Animalhosptl || !Array.isArray(data.Animalhosptl[1].row)) {
                        console.error(`데이터 형식이 잘못되었거나 누락되었습니다 - 페이지 ${pageIndex}:`, data);
                        continue;
                    }

                    const locations = data.Animalhosptl[1].row.map(item => ({
                        lat: parseFloat(item.REFINE_WGS84_LAT),
                        lng: parseFloat(item.REFINE_WGS84_LOGT),
                        name: item.BIZPLC_NM,
                    }));

                    markers.push(...locations);
                }

                if (!mapElement.current || !navermaps) return;

                const mapOptions = {
                    center: new navermaps.LatLng(markers[0].lat, markers[0].lng),
                    zoom: 12,
                    zoomControl: true,
                };

                const map = new navermaps.Map(mapElement.current, mapOptions);

                // 마커 생성 및 지도에 추가
                markers.forEach(location => {
                    new navermaps.Marker({
                        position: new navermaps.LatLng(location.lat, location.lng),
                        map: map,
                        title: location.name,
                    });
                });
            } catch (error) {
                console.error('동물병원 정보를 가져오는 중에 오류가 발생했습니다:', error);
            }
        };

        // API 호출 및 지도 표시
        fetchAnimalHospitals();
    }, [navermaps]);

    return (
        <>
            <h1>동물병원 위치</h1>
            <div ref={mapElement} style={{ height: '700px', width: '1500px', margin: '0 auto' }} />
        </>
    );
};

export default PetHospital;
