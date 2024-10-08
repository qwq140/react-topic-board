import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const ProtectedRoute = ({children, requiredRole}) => {
    const {isAuthenticated, user} = useAuth();

    // 인증되지 않은 경우 로그인 페이지로 이동
    if(!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    // 필요한 권한이 없는 경우 접근 차단
    if(requiredRole && !user.roles.includes(requiredRole)) {
        return <Navigate to='/' replace />
    }

    return children;
}

export default ProtectedRoute;