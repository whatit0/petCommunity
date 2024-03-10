import React from 'react';
import '../style/MainContent.css';

function MainContent() {
    return (
        <main className="main-content">
            <SearchBar />
            <section className="recommendation-section">
                <h2 className="recommendation-title">추천 컨텐츠</h2>
                <div className="cards-container">

                </div>
            </section>
        </main>
    );
}
function SearchBar() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="통합 검색" />
            <button>검색</button>
        </div>
    );
}

function Card({ image, title, description }) {
    return (
        <div className="card">
            <img src={image} alt="Pet" />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default MainContent;
