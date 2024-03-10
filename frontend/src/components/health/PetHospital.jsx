import React, { useEffect, useRef, useState } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import '../style/hospital.css';

const PetHospital = () => {
    const mapElement = useRef(null);
    const navermaps = useNavermaps();
    const [selectedHospital, setSelectedHospital] = useState(null);

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
                        addr: item.REFINE_ROADNM_ADDR,
                        tel: item.LOCPLC_FACLT_TELNO,
                        aa: item.BSN_STATE_NM
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
                    const marker = new navermaps.Marker({
                        position: new navermaps.LatLng(location.lat, location.lng),
                        map: map,
                        title: location.name,
                    });
                    // 마커 클릭 이벤트 처리
                    navermaps.Event.addListener(marker, 'click', () => {
                        // 클릭한 마커의 정보를 state에 저장
                        setSelectedHospital(location);
                        console.log(location)
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
        <div style={{ display: 'flex' }}>
            <div>
                <h3 className='map'>경기도 동물병원 지도</h3>
                <p className='map2'>(마커 클릭 시 병원 정보가 나타납니다.)</p>
                <div ref={mapElement} style={{ height: '560px', width: '900px', margin: 'auto 10px' }} />
            </div>
            {selectedHospital && (
                <div className='box effect8' style={{ flex: 1, marginLeft: '20px' }}>
                    <h3 className='hospital'>병원 정보</h3>
                    <h5>병원 이름 : {selectedHospital.name}</h5>
                    <h5>병원 주소 : {selectedHospital.addr}</h5>
                    <h5>병원 전화번호 : {selectedHospital.tel}</h5>
                </div>
            )}
        </div>
    );
};

export default PetHospital;