import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/index/Header";
import LoginPage from "./components/member/LoginPage";
import SignUpPage from "./components/member/SignUpPage";

function App() {
  return (
      <Routes>
        <Route path='/' element={<Header/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
  );
}

export default App;
