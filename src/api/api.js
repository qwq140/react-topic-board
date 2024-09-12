import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL : API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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
        if(error.response && error.response.status === 401) {
            const refreshToken = localStorage.getItem("refreshToken");
            if(refreshToken) {
                try {
                    const response = await api.post("/auth/reissue", {refreshToken});
                    const newAccessToken = response.data.data.accessToken;
                    const newRefreshToken = response.data.data.refreshToken;

                    localStorage.setItem("accessToken", newAccessToken);
                    localStorage.setItem("refreshToken", newRefreshToken);

                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                } catch (e) {
                    console.log('토큰 갱신 실패 : ', e);

                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("isAuth");
                    localStorage.removeItem("user");

                    alert("로그인을 다시 해주세요");
                    window.location.href = '/login';
                }
            } else {
                alert("로그인을 해주세요");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;