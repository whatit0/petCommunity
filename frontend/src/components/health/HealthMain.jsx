import React from "react";
import {Link} from "react-router-dom";

const HealthMain = () => {
    return (
        <div>
            <h2>메인 페이지</h2>
            <ul>
                <li><Link to='/calorie'>권장 칼로리 계산</Link></li>
                <li><Link to='/bmi'>비만도 계산</Link></li>
                <li><Link to='/age'>나이 계산</Link></li>
            </ul>
        </div>
    )
}

export default HealthMain