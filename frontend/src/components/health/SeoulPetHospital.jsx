import React, { useEffect, useRef } from 'react';
import { useNavermaps } from 'react-naver-maps';

const PetHospital = () => {
    const mapElement = useRef(null);
    const navermaps = useNavermaps();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seoulApiKey = '586c6b5155776b6537305344576d61';
                const type = 'json';
                const pageSize = 1000;
                const totalSize = 2105;
                const totalPages = Math.ceil(totalSize / pageSize);

                const markers = [];

                for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
                    const seoulApiUrl = `http://openapi.seoul.go.kr:8088/${seoulApiKey}/${type}/LOCALDATA_020301/${pageIndex}/${pageSize}/`;

                    const seoulResponse = await fetch(seoulApiUrl);
                    const seoulData = await seoulResponse.json();

                    if (!seoulData || !seoulData.LOCALDATA_020301 || !seoulData.LOCALDATA_020301.row) {
                        console.error(`데이터 형식이 잘못되었거나 누락되었습니다 - 페이지 ${pageIndex}:`, seoulData);
                        continue;
                    }

                    seoulData.LOCALDATA_020301.row.forEach(item => {
                        const x = parseFloat(item.X);
                        const y = parseFloat(item.Y);
                        const name = item.BPLCNM;

                        markers.push({ x, y, name });
                    });
                }

                console.log('Seoul Animal Hospitals Data:', markers);
                return markers;
            } catch (error) {
                console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
                return [];
            }
        };

        const displayMarkersOnMap = (markers) => {
            if (!mapElement.current || !navermaps) return;

            const mapOptions = {
                center: new navermaps.LatLng(markers[0].y, markers[0].x),
                zoom: 12,
                zoomControl: true,
            };

            const map = new navermaps.Map(mapElement.current, mapOptions);

            // 마커 생성 및 지도에 추가
            markers.forEach(location => {
                if (location.y && location.x) {
                    new navermaps.Marker({
                        position: new navermaps.LatLng(location.y, location.x),
                        map: map,
                        title: location.name,
                    });
                }
            });
        };

        // 데이터 호출 및 지도에 표시
        fetchData().then(displayMarkersOnMap);
    }, [navermaps]);

    return (
        <>
            <h1>동물병원 위치</h1>
            <div ref={mapElement} style={{ height: '700px', width: '1500px', margin: '0 auto' }} />
        </>
    );
};

export default PetHospital;
