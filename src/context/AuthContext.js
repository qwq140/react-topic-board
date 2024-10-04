import {createContext, useContext, useReducer, useState} from "react";

// 컨텍스트 생성
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

// 사용자 정의 훅
export const useAuth = () => useContext(AuthContext);