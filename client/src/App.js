import logo from './logo.svg';
import './App.css';

import { useEffect } from "react"
import { Navigate, Route, Routes } from 'react-router';
import Chat from './page/Chat';
import Login from './page/Login';
import Register from './page/Register';
import ForgetPassword from './page/ForgetPassword';
import ResetPassword from './page/ResetPassword';
function App() {
  const user = JSON.parse(localStorage.getItem("token"));
  console.log(user);
  return (
    <Routes>
      <Route path="/" element={user ? <Chat /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      <Route path="/forgetpassword" element={!user ? <ForgetPassword /> : <Navigate to="/" />} />
      <Route path="/resetpassword/:token" element={!user ? <ResetPassword /> : <Navigate to="/" />} />
      
    </Routes>
  );
}

export default App;
