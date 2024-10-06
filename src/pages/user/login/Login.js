import React, { useState } from 'react';
import api from "../../../api/api";
import {useAuth} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { username, password });
            if(response.data.code === 200) {
                const tokenData = response.data.data;
                localStorage.setItem("accessToken", tokenData.accessToken);
                localStorage.setItem("refreshToken", tokenData.refreshToken);

                console.log(tokenData.accessToken);
                console.log(tokenData.refreshToken);

                const myDataResponse = await api.get('/users/my');

                if(myDataResponse.data.code === 200) {
                    const user = myDataResponse.data.data;
                    login(user);
                    navigate('/');
                } else {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    alert("로그인 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요");
                }
            }
        } catch (e) {
            if(e.response && e.response.data) {
                if(e.response.data.errorCode === "VALIDATION-001") {
                    const validationErrorData = e.response.data.data;
                    const errorMessage = validationErrorData[Object.keys(validationErrorData)[0]];
                    alert(errorMessage);
                } else {
                    alert(e.response.data.message || '로그인 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
                }
            } else {
                alert('로그인 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 pt-6 w-full">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">로그인</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">아이디</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
