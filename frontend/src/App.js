import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import RegisterPage from "./components/chat/pages/RegisterPage/RegisterPage";
import Header from "./components/index/Header";
import LoginPage from "./components/member/LoginPage";

function App() {
  return (
      <Routes>
        <Route path='/' element={<Header/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
      </Routes>
  );
}

export default App;
