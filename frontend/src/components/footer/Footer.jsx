import React from 'react';
import '../style/Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <nav>
                <ul>
                    <li>
                        <a href='https://github.com/Imadeveloperrr/petCommunity.git'>Github</a>
                    </li>
                    <li>
                        <a href='https://www.notion.so/0cb11c61b4f4490d9156fac4cfadb49c?v=d13c16587df34a33a6f266b116d86784&pvs=4'>Notion</a>
                    </li>
                </ul>
                <ul className='name'>
                    <li>반려동물 커뮤니티 사이트</li>
                    <li>만든이 : 한국인 유광진 이성호</li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;
