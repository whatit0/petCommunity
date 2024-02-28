import React, { useState } from 'react';
const PetAge = () => {
    const [petType, setPetType] = useState('dog');
    const [years, setYears] = useState('0');
    const [months, setMonths] = useState('0');
    const [humanAge, setHumanAge] = useState(null);
    const [size, setSize] = useState('small'); // 'small', 'medium', 'large'
    const [loading, setLoading] = useState(false);
    // 이미지 클릭 여부
    const [dogClicked, setDogClicked] = useState(false);
    const [catClicked, setCatClicked] = useState(false);


    // 계산식
    const handleCalculation = async () => {
        setLoading(true);
        const requestData = { petType, years, months, size: petType === 'dog' ? size : undefined };
        const response = await fetch('http://localhost:8080/api/age', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        if (response.ok) {
            const data = await response.json();
            setHumanAge(data.humanMonths === 0 ? `${data.humanYears}살` : `${data.humanYears}살 ${data.humanMonths}개월`);
        } else {
            console.error('Error fetching data:', response.statusText);
        }
        setLoading(false); // 로딩 종료
    };

    const yearOptions = [];
    for (let i = 0; i <= 21; i++) {
        yearOptions.push(<option key={i} value={i}>{i}년</option>);
    }

    const monthOptions = [];
    for (let i = 0; i < 12; i++) {
        monthOptions.push(<option key={i} value={i}>{i}개월</option>);
    }

    // 반려동물 종류 선택 시 업데이트
    const handleDogClick = () => {
        setPetType('dog');
        console.log('강아지');
        setDogClicked(true);
        setCatClicked(false);
    };
    const handleCatClick = () => {
        setPetType('cat');
        console.log('고양이');
        setDogClicked(false);
        setCatClicked(true);
    };

    return (
        <div>
            <div className='kPZNmC'>
                <div className='kwyvZj'>
                    <h1 className='fTYTfl'>
                        <span color='#f29833' className='jtRxxS'>나이</span>&nbsp;계산기
                    </h1>
                    <p className='jSXtyK'>우리 집 아이는 <br/>사람 나이로는 몇 살일까요?</p>
                </div>
                <img src='/images/PetAge.jpeg' className='dXDVfN'/>
            </div>

            <div className='fNKwjb'>
                <div className='hRbrmk'>
                    <div className='kYCTRC'>
                        <div className='gJPmZJ'>
                            <label className='YylJn'>반려동물 종류</label>
                            <div className='fptxwn'>
                                <div className={`bQTTNz ${dogClicked ? 'clicked' : ''}`}>
                                    <img src='/images/dog.png' className='fdIoQm'
                                        onClick={handleDogClick} disabled={loading}/>
                                    <p className='iOsWVx'>강아지</p>
                                </div>
                                <div className={`bQTTNz ${catClicked ? 'clicked' : ''}`}>
                                    <img src='/images/cat.png' className='fdIoQm'
                                         onClick={handleCatClick} disabled={loading}/>
                                    <p className='iOsWVx'>고양이</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {petType === 'dog' && (
                    <div className='kYCTRC'>
                        <div className='gJPmZJ'>
                            <label className='YylJn'>강아지 크기</label>
                            <div className='hiJHbI'>
                                <div className='dlenDA'>
                                    <select className='select' value={size} onChange={e => setSize(e.target.value)}>
                                        <option value="small">소형견</option>
                                        <option value="medium">중형견</option>
                                        <option value="large">대형견</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                        <div className='gJPmZJ'>
                            <label className='YylJn'>나이</label>
                            <div className='sss'>
                            <select className='select' value={years} onChange={e => setYears(e.target.value)}>
                                {yearOptions}
                            </select>
                            <select className='select2' value={months} onChange={e => setMonths(e.target.value)}>
                                {monthOptions}
                            </select>
                            </div>
                        </div>
                    <div className='jBEMOy'>
                        <button onClick={handleCalculation} className='dDNoAf'>결과보기</button>
                    </div>
                </div>
            </div>
            {humanAge &&
            <div className='goPBwY'>
                <div className='kZWmnH'>
                    <h4 className='gzlObi'>사람 나이로는 &nbsp;
                        <span color='#f29833' className='bmcAog'>{humanAge}</span>&nbsp;입니다!
                    </h4>
                    <p color='#868688' className='amJMX'>추정치인 것이지 100% 정확하지 않습니다. <br/> 참고용으로만 봐주세요.</p>
                </div>
            </div>
            }
        </div>
    );
};

export default PetAge;