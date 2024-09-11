import {useRef} from "react";
import {useNavigate} from "react-router-dom";

// api get 요청 데이터를 불러오지 못했을때 사용
export const useErrorHandler = () => {
    const hasErrorRef = useRef(false);
    const navigate = useNavigate();

    return (errorMessage) => {
        if (!hasErrorRef.current) {
            hasErrorRef.current = true;
            alert(errorMessage);
            navigate(-1);
        }
    };
}