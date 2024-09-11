import {useState} from "react";
import api from "../../api/api";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const navigate = useNavigate();

    const {state, dispatch} = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();
        let data = {
            username,
            password,
            nickname
        };

        try {
            const response = await api.post('/auth/join', data);
            if(response.data.code === 200) {
                const tokenData = response.data.data;
                localStorage.setItem("accessToken", tokenData.accessToken);
                localStorage.setItem("refreshToken", tokenData.refreshToken);

                const myDataResponse = await api.get('/users/my');

                if(myDataResponse.data.code === 200) {
                    const user = myDataResponse.data.data;
                    dispatch({type : 'LOGIN', payload : {user}});
                    navigate('/');
                } else {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    alert("로그인에 실패하였습니다. 잠시 후 다시 시도해주세요");
                }
            }
        } catch (error) {
            if(error.response.data) {
                let errorData = error.response.data;
                alert(errorData.message);
            }
        }
    }

    return (
        <div className="flex items-center justify-center bg-gray-50 pt-6">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">회원가입</h2>
                <form onSubmit={handleSignup} className="space-y-4">
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
                        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">닉네임</label>
                        <input
                            id="nickname"
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
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
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;