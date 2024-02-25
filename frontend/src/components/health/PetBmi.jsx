import React, { useState } from 'react';

const PetBmi = () => {
    const [petType, setPetType] = useState('dog');
    // 이미지 클릭 여부
    const [dogClicked, setDogClicked] = useState(false);
    const [catClicked, setCatClicked] = useState(false);
    // 각 각의 bmi 이미지를 클릭 경우
    const [selectedDogImage, setSelectedDogImage] = useState(null);
    const [selectedCatImage, setSelectedCatImage] = useState(null);
    const [resultText, setResultText] = useState('');

    // 각 각 bmi 이미지 5개
    const dogImages = ['/images/Dogbmi1.png','/images/Dogbmi2.png','/images/Dogbmi3.png','/images/Dogbmi4.png','/images/Dogbmi5.png'];
    const catImages = ['/images/Catbmi1.png','/images/Catbmi2.png','/images/Catbmi3.png','/images/Catbmi4.png','/images/Catbmi5.png'];

    // bmi 이미지 설명
    const petText = [
        '밥을 많이 주셔야 합니다! \n\n갈비뼈, 척추, 허리 뼈가 육안으로 확인되고 \n갈비뼈 주위를 만지면 지방이 느껴지지 않습니다. ',
        '밥을 더 주셔도 괜찮습니다! \n\n저체중으로 뼈가 드러나 보이지는 않으나 \n허리의 굴곡이 보이며 갈비뼈가 만져집니다.',
        '좋은 체형입니다! \n\n이상적인 체형으로 배의 굴곡이 앞발에서 \n뒷발 방향으로 부드러운 곡선으로 올라갑니다.',
        '적절한 체중 관리를 해주셔야 합니다! \n\n과체중으로 허리의 굴곡이 살짝 보이며 \n피하지방이 많이 잡힙니다.  ',
        '비만이므로 체중 관리가 필요합니다! \n\n비만으로 허리 아래 굴곡이 없으며 피하지방이 \n몸 전체를 감싸고 갈비뼈가 만져지지 않습니다.'];

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

    // bmi 사진 클릭 시
    const handleDogBmiClick = (index) => {
        setSelectedDogImage(index);
    };
    const handleCatBmiClick = (index) => {
        setSelectedCatImage(index);
    };

    const handleResultClick = () => {
        let selectedImageIndex = petType === 'dog' ? selectedDogImage : selectedCatImage;
        if (selectedImageIndex !== null && selectedImageIndex >= 0 && selectedImageIndex < petText.length) {
            setResultText(petText[selectedImageIndex]);
        } else {
            setResultText('이미지를 선택해주세요.');
        }
    };

    return (
        <div>
            <div className='kPZNmC'>
                <div className='kwyvZj'>
                    <h1 className='fTYTfl'>
                        <span color='#3b74c8' className='dVfrqK'>비만도</span>계산기
                    </h1>
                    <p className='jSXtyK'>우리 반려동물의 비만도를  <br/> 간단하게 외형적으로 판단할 수 있습니다.</p>
                </div>
                <img src='/images/PetBmi.jpg' className='dXDVfN2'/>
            </div>
            <div className='fNKwjb'>
                <div className='hRbrmk'>
                    <div className='kYCTRC'>
                        <div className='gJPmZJ'>
                            <label className='YylJn'>반려동물 종류
                            </label>
                            <div className='fptxwn'>
                                <div className={`bQTTNz ${dogClicked ? 'clicked' : ''}`}>
                                    <img src='/images/dog.png' className='fdIoQm' onClick={handleDogClick}/>
                                    <p className='iOsWVx'>강아지</p>
                                </div>
                                <div className={`bQTTNz ${catClicked ? 'clicked' : ''}`}>
                                    <img src='/images/cat.png' className='fdIoQm' onClick={handleCatClick}/>
                                    <p className='iOsWVx'>고양이</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='kYCTRC'>
                        <div className='gJPmZJ'>
                            <label className='YylJn'>반려동물과 닮은 <br/> 사진을 골라주세요.</label>
                            <div className='fptxwn1'>
                                {dogClicked && (
                                    <div className='xlDojContainer'>
                                    {dogImages.map((dogImg, index) => (
                                    <div key={index} className={`xlDoj ${selectedDogImage === index ? 'selected' : ''}`}>
                                        <img src={dogImg} className='fdIoQm' onClick={() => handleDogBmiClick(index)} />
                                    </div>
                                ))}
                                    </div>
                                )}
                                {catClicked && (
                                    <div className='xlDojContainer'>
                                        {catImages.map((catImg, index) => (
                                    <div key={index} className={`xlDoj ${selectedCatImage === index ? 'selected' : ''}`}>
                                        <img src={catImg} className='fdIoQm' onClick={() => handleCatBmiClick(index)} />
                                    </div>
                                ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='jBEMOy'>
                        <button type='submit' className='dDNoAf' onClick={handleResultClick}>결과보기</button>
                    </div>
                </div>
            </div>
            {resultText &&
            <div className='goPBwY'>
                <h2 className='htuSpd'>
                    <span color='#3b74c8' className='dVfrqK'>비만도 계산</span>&nbsp;결과
                </h2>
                <div className='keZySM'>
                    <h1 className='gzlObi1'>우리 반려동물은</h1>
                    <h4 style={{color: '#3b74c8'}} className='kbToWE'>{resultText}</h4>
                </div>
            </div>
            }
        </div>
    )
}

export default PetBmi;