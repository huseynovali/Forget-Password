import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router';
import { instance } from '../service/axiosInstance';
import { useNavigate } from "react-router-dom"
function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const token = useParams().token
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('uncorrect password !!!');
            return;
        }

        try {
            const response = await instance.post('/auth/api/reset-password', {
                password,
                confirmPassword,
                token
            });

            const data = response.data;

            if (response.status === 200) {
              navigate("/login")
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.log(error);
            setMessage('ERROR !!!');
        }
    };

    return (
        <div className='w-[500px] bg-slate-500 m-auto mt-20 p-3'>
            <h2 className='text-xl text-center'>Change password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">new Password:</label>
                    <input
                        type="password"
                        id="password"
                        className='w-full p-2 rounded-md'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">new password (again):</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className='w-full p-2 rounded-md'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='p-2 bg-gray-400 rounded-md mt-3 text-white'>Change Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPassword;
