import logo from './logo.svg';
import './App.css';

import { useEffect } from "react"
import { Navigate, Route, Routes } from 'react-router';
import Chat from './page/Chat';
import Login from './page/Login';
import Register from './page/Register';
function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <Routes>
      <Route path="/" element={user ? <Chat /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
