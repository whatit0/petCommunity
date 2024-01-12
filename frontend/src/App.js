import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import ChatPage from "./components/chat/pages/ChatPage/ChatPage";
import LoginPage from "./components/chat/pages/LoginPage/LoginPage";
import RegisterPage from "./components/chat/pages/RegisterPage/RegisterPage";

function App() {
  return (
      <Routes>
        <Route path='/' element={<ChatPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
      </Routes>
  );
}

export default App;
