import React, { useState } from 'react';
import axios from 'axios';
import { instance } from '../service/axiosInstance';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await instance.post('/auth/api/forgot-password', { email });
            if (response.status === 200) {

                setMessage('send message to email !');
                setTimeout(()=>{
                    navigate("/login")
                },1000)
            }
        } catch (error) {
            if (error.response) {

                setMessage(error.response.data.message);
            } else {

                setMessage('Error !');
            }
        }
    };

    return (
        <div className='w-[500px] bg-slate-500 m-auto mt-20 p-3'>
            <h2 className='text-xl text-center'>Şifremi Unuttum</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">E-posta Adresi:</label>
                    <input
                        type="email"
                        id="email"
                        className='w-full p-2 rounded-md'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='p-2 bg-gray-400 rounded-md mt-3 text-white'>Send Change password message to Email</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgetPassword;
