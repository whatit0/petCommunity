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

    // 펫타입이 바뀔 때마다 호출
    useEffect(() => {
        resetStates();
    }, [petType]);

    return (
        <div>
            <h2>반려동물 건강 계산기</h2>
            <div>
                <button onClick={() => {setPetType('dog'); console.log('강아지');}} disabled={loading}>강아지</button>
                <button onClick={() => {setPetType('cat'); console.log('고양이');}} disabled={loading}>고양이</button>
            </div>
            <div>
                <label style={{marginRight: '1em'}}>반려동물 몸무게</label>
                <input
                    type="number"
                    placeholder="몸무게 (소수점 둘째까지 입력 가능)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    disabled={loading}
                    step="0.01"
                    style={{width:'300px', marginRight:'5px'}}
                />kg
            </div>
            <div>
                <select
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

            <div>
                <button onClick={calculateResult} disabled={loading}>결과보기</button>
            </div>
            {loading && <p>계산 중...</p>}
            {isCalculated && (
                <>
            {petType === 'dog' && dogRer && <div>기초 대사량 : {dogRer} kcal</div>}
            {petType === 'dog' && dogCalorie && <div>권장 칼로리 : {dogCalorie} kcal</div>}
            {petType === 'cat' && catRer && <div>기초 대사량 : {catRer} kcal</div>}
            {petType === 'cat' && catCalorie && <div>권장 칼로리 : {catCalorie} kcal</div>}
            <div>[여러가지 요인으로 아이의 상태와 다르게 나올 수 있으니 <br/>
                더 정확한 건강 측정은 전문가와 상담해주세요.]</div>
                </>
            )}
        </div>
    );
};

export default PetCalorie