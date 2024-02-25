import React from 'react';
import '../style/MainContent.css';

function MainContent() {
    return (
        <main className="main-content">
            <SearchBar />
            <section className="recommendation-section">
                <h2 className="recommendation-title">추천 컨텐츠</h2>
                <div className="cards-container">
                    <Card
                        image="/logo512.png"
                        title="동적으로 수정해야함"
                        description="유광진"
                    />
                    <Card
                        image="/logo512.png"
                        title="동적으로 수정해야함"
                        description="유광진"
                    />
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
