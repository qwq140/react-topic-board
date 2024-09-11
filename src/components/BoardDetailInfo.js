import {useEffect, useState} from "react";
import api from "../api/api";

const BoardDetailInfo = ({boardId}) => {

    const [board, setBoard] = useState({});

    useEffect(() => {
        let ignore = false;

        async function fetching() {
            const response = await api.get(`/boards/${boardId}`);
            const data = response.data.data;

            if(!ignore) {
                setBoard({...data});
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