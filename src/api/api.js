import axios from "axios";
import {useAuth} from "../context/AuthContext";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL : API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


const handleUnauthorized = async (error, originalRequest, logout) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if(refreshToken) {
        try {
            const response = await api.post("/auth/reissue", {refreshToken});
            const newAccessToken = response.data.data.accessToken;
            const newRefreshToken = response.data.data.refreshToken;

            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (e) {
            logout();

            alert("로그인을 다시 해주세요");
            window.location.href = '/login';
        }
    } else {
        logout();

        alert("로그인을 해주세요");
        window.location.href = "/login";
    }
}

export const useAxiosInterceptors = () => {
    const {logout} = useAuth();

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if(error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                return handleUnauthorized(error, originalRequest, logout);
            }
            return Promise.reject(error);
        }
    );
}



export default api;