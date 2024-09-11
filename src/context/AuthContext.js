import {createContext, useContext, useReducer} from "react";

const initialState = {
    isAuth : localStorage.getItem('isAuth') || false,
    user : JSON.parse(localStorage.getItem('user')) || null,
};

// 리듀서 함수
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('isAuth', true);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                isAuth : true,
                user: action.payload.user,
            };
        case 'LOGOUT':
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return {
                isAuth : false,
                user : null,
            };
        default :
            return state;
    }
}

// 컨텍스트 생성
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
};

// 사용자 정의 훅
export const useAuth = () => useContext(AuthContext);