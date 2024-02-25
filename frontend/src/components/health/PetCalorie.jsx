import React, {useEffect, useState} from "react";

const PetCalorie = () => {
    const [petType, setPetType] = useState('dog');
    const [weight, setWeight] = useState('');
    const [condition, setCondition] = useState('');
    const [loading, setLoading] = useState(false);
    // 강아지 RER과 칼로리 상태
    const [dogRer, setDogRer] = useState(null);
    const [dogCalorie, setDogCalorie] = useState(null);
    // 고양이 RER과 칼로리 상태 추가
    const [catRer, setCatRer] = useState(null);
    const [catCalorie, setCatCalorie] = useState(null);
    const [isCalculated, setIsCalculated] = useState(false);
    // 이미지 클릭 여부
    const [dogClicked, setDogClicked] = useState(false);
    const [catClicked, setCatClicked] = useState(false);


    const calculateResult = async () => {
        const requestData = {
            petType,
            weight,
            condition
        };

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/calorie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            if (petType === 'dog') {
                setDogRer(parseFloat(data.dogRer.toFixed(2)));
                setDogCalorie(parseFloat(data.dogCalorie.toFixed(2)));
            } else if (petType === 'cat') {
                setCatRer(parseFloat(data.catRer.toFixed(2)));
                setCatCalorie(parseFloat(data.catCalorie.toFixed(2)));
            }
            setIsCalculated(true);
        } catch (error) {
            console.error("There was an error!", error);
        } finally {
            setLoading(false);
        }
    };

    // 초기화
    const resetStates = () => {
        setDogCalorie(null);
        setDogRer(null);
        setCatCalorie(null);
        setCatRer(null);
        setIsCalculated(false);
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

    // 펫타입이 바뀔 때마다 호출
    useEffect(() => {
        resetStates();
    }, [petType]);

    return (
        <div>
            <div className='kPZNmC2'>
                <div className='kwyvZj'>
                    <h1 className='fTYTfl'>
                        <span color='#5843be' className='jqoyYi'>권장칼로리</span>&nbsp;계산기
                    </h1>
                    <p className='jSXtyK'>반려동물의 몸무게, 상태에 따라
                        <br/>
                        권장되는 칼로리를 계산해보세요.
                    </p>
                </div>
                <img src='/images/PetCalorie.png' className='dXDVfN1'/>
            </div>

            <div className='fNKwjb'>
                <div className='hRbrmk'>
                    <div className='kYCTRC'>
                        <div className='gJPmZJ'>
                            <label className='YylJn'>반려동물 종류
                            </label>
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
                    <div className='kYCTRC'>
                        <div className='gJPmZJ'>
                            <label className='YylJn'>반려동물 몸무게
                            </label>
                            <div className='gtlVxb'>
                                <input
                                    type="number"
                                    placeholder="몸무게 (소수점 둘째자리까지 입력가능)"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    disabled={loading}
                                    step="0.01"
                                    style={{width:'300px', marginRight:'5px'}}
                                    className='hwqdEQ'
                                />
                                <div className='exYVIV'>
                                    <div className='gFqYOF'>kg</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='kYCTRC'>
                        <div className='gJPmZJ'>
                            <label className='YylJn'>반려동물 상태</label>
                            <div disabled className='bsdMAp'>
                                <select className='select'
                                    value={condition}
                                    onChange={(e) => setCondition(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">반려동물 상태 선택</option>
                                    {petType === 'dog' ? (
                                        <>
                                            <option value="dogHealthy1">4개월미만 강아지</option>
                                            <option value="dogHealthy2">4 ~ 12개월 강아지</option>
                                            <option value="dogHealthy3">중성화 된 성견</option>
                                            <option value="dogHealthy4">중성화 되지 않은 성견</option>
                                            <option value="dogHealthy5">체중 감량 필요</option>
                                            <option value="dogHealthy6">체중 증량 필요</option>
                                            <option value="dogHealthy7">가벼운 활동</option>
                                            <option value="dogHealthy8">적당한 활동</option>
                                            <option value="dogHealthy9">강한 활동</option>
                                            <option value="dogHealthy10">임신 초기</option>
                                            <option value="dogHealthy11">임신 후기</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="catHealthy1">4개월 미만 고양이</option>
                                            <option value="catHealthy2">4 ~ 6개월 고양이</option>
                                            <option value="catHealthy3">7 ~ 12개월 고양이</option>
                                            <option value="catHealthy4">일반 성묘</option>
                                            <option value="catHealthy5">중성화한 성묘</option>
                                            <option value="catHealthy6">활동량이 많은 고양이</option>
                                            <option value="catHealthy7">노묘</option>
                                            <option value="catHealthy8">비만 고양이</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='jBEMOy'>
                        <button onClick={calculateResult} disabled={loading} className='dDNoAf'>결과보기</button>
                    </div>
                </div>
            </div>

            {isCalculated && (
                        <div className='goPBwY'>
                            <h2 className='htuSpd'>
                                <span color='5843be' className='jqoyYi'>권장칼로리</span>&nbsp;결과
                            </h2>
                            <div className='keJchx'>
                        <>
                            <div className='kcKeYA'>
                                <div className='jmelwH'>
                                    <h4 className='gzlObi'>1일 기초 대사량</h4>
                                        {petType === 'dog' && dogRer &&
                                            <h4 color='#090909' className='gzlObi'>
                                                <span color='#5843be' className='bOhfPC'>{dogRer}</span>&nbsp;kcal</h4>}
                                        {petType === 'cat' && catRer &&
                                            <h4 color='#090909' className='gzlObi'>
                                                <span color='#5843be' className='bOhfPC'>{catRer}</span>&nbsp;kcal</h4>}
                                </div>
                                <div className='jmelwH'>
                                    <h4 className='gzlObi'>1일 권장 칼로리</h4>
                                        {petType === 'dog' && dogCalorie &&
                                            <h4 color='#090909' className='gzlObi'>
                                                <span color='#5843be' className='bOhfPC'>{dogCalorie}</span>&nbsp;kcal</h4>}
                                        {petType === 'cat' && catCalorie &&
                                            <h4 color='#090909' className='gzlObi'>
                                                <span color='#5843be' className='bOhfPC'>{catCalorie}</span>&nbsp;kcal</h4>}
                                </div>
                            </div>
                            <p>여러가지 요인으로 아이의 상태와 다르게 나올 수 있으니 <br/>
                                더 정확한 건강 측정은 전문가와 상담해주세요.</p>
                        </>
                            </div>
                        </div>
                    )}
        </div>
    );
};

export default PetCalorie