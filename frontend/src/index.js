import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./components/chat/store";
import Header from "./components/index/Header";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="App">
                <Header/>
            </div>
            <App/>
        </BrowserRouter>
    </Provider>
);