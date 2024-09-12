import {useEffect, useState} from "react";
import api from "../api/api";

const BoardDetailInfo = ({boardId, handleError}) => {

    const [board, setBoard] = useState({});

    useEffect(() => {
        let ignore = false;

        const fetching = async () => {
            try {
                const response = await api.get(`/boards/${boardId}`);
                const data = response.data.data;

                if(!ignore) {
                    setBoard({...data});
                }
            } catch (e) {
                if(!ignore) {
                    let errorMessage = '게시판 정보를 불러오는 중 오류가 발생하였습니다.';
                    if(e.response && e.response.data && e.response.data.message) {
                        errorMessage = e.response.data.message;
                    }
                    handleError(errorMessage);
                }
            }
        }

        fetching();

        return () => {
            ignore = true;
        }
    }, []);

    return (
        <div className="border p-3">
            <h3>{board.name}</h3>
            <h5>{board.description}</h5>
        </div>
    );
}

export default BoardDetailInfo;