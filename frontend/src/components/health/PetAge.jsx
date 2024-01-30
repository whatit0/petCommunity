import React, { useState } from 'react';
const PetAge = () => {
    const [petType, setPetType] = useState('dog');
    const [years, setYears] = useState('0');
    const [months, setMonths] = useState('0');
    const [humanAge, setHumanAge] = useState(null);
    const [size, setSize] = useState('small'); // 'small', 'medium', 'large'
    const [loading, setLoading] = useState(false);


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
            // 에러 처리
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

    return (
        <div>
            <h2>강아지 고양이 나이 계산기</h2>
            <div>
                <button onClick={() => setPetType('dog')} disabled={loading}>강아지</button>
                <button onClick={() => setPetType('cat')} disabled={loading}>고양이</button>
            </div>
            {petType === 'dog' && (
                <div>
                    <label>강아지 크기: </label>
                    <select value={size} onChange={e => setSize(e.target.value)}>
                        <option value="small">소형견</option>
                        <option value="medium">중형견</option>
                        <option value="large">대형견</option>
                    </select>
                </div>
            )}
            <div>
                <label>나이:</label>
                <select value={years} onChange={e => setYears(e.target.value)}>
                    {yearOptions}
                </select>
                년
                <select value={months} onChange={e => setMonths(e.target.value)}>
                    {monthOptions}
                </select>
                개월
            </div>
            <button onClick={handleCalculation}>계산하기</button>
            {humanAge && <p>사람 나이로는 {humanAge} 입니다.</p>}
        </div>
    );
};

export default PetAge