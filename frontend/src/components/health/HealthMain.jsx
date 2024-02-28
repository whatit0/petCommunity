import React from "react";
import {Link} from "react-router-dom";
import '../style/Health.css';

const HealthMain = () => {
    return (
        <div>
            <div className='kPZNmC'>
                <div className='kwyvZj'>
                    <h1 className='fTYTfl'>건강 계산기</h1>
                    <p className='jSXtyK'>반려동물 건강 계산기 모음</p>
                </div>
                <img src='/images/Animals.jpeg' className='dXDVfN'/>
            </div>
            <div className='hDpDs'>
            <div className='tNmRB'>
                <div className='cHSJLy'>
                    <h2 className='htuSpd'>
                            <span color='#4e7f1c' className='ezEwqp'>
                            권장 칼로리
                            </span>
                        <br/>
                        계산기
                    </h2>
                    <Link to='/calorie'>
                        <button color='#4e7f1c' className='hhJxgO'>></button>
                    </Link>
                </div>

                <div className='iSougt'>
                    <h2 className='htuSpd'>
                            <span color='#5843be' className='jqoyYi'>
                            비만도
                            </span>
                        <br/>
                        계산기
                    </h2>
                    <Link to='/bmi'>
                        <button color='#5843be' className='dbqfBJ'>></button>
                    </Link>
                </div>

                <div className='izDjXA'>
                    <h2 className='htuSpd'>
                            <span color='#3b74c8' className='dVfrqK'>
                            나이
                            </span>
                        <br/>
                        계산기
                    </h2>
                    <Link to='/age'>
                        <button color='#3b74c8' className='cBoJJF'>></button>
                    </Link>
                </div>
            </div>
        </div>
            </div>
    )
}

export default HealthMain