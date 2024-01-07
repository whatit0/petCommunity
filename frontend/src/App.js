import React from 'react';
import Header from './components/index/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/member/LoginPage';
import SignUpPage from './components/member/SignUpPage';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
