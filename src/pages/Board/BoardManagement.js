import {useEffect, useState} from "react";
import api from "../../api/api";
import BoardManagementListItem from "./components/BoardManagementListItem";
import ErrorDialog from "../../components/ErrorDialog";

const BoardManagement = () => {

    const [boards,setBoards] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function dataFetching() {
            try {
                const response = await api.get('/boards');
                const data = response.data.data;
                if(!ignore) {
                    setBoards([...data.boards]);
                }
            } catch (e) {
                if(!ignore) {
                    let errorMessage = '게시판 목록을 불러오는 중 에러가 발생하였습니다.';
                    if(e.response && e.response.data && e.response.data.message) {
                        errorMessage = e.response.data.message;
                    }
                    alert(errorMessage);
                }
            }
        }

        dataFetching();

        return () => {
            ignore = true;
        }
    },[]);

    const handleSave = async (boardId, name, description) => {
        try {
            await api.put(`/boards/${boardId}`, {name, description});
            const newBoards = boards.map(board => board.id === boardId ? {boardId, name, description} : board);
            setBoards(newBoards);
        } catch (e) {
            if(e.response && e.response.data) {
                if(e.response.data.errorCode === "VALIDATION-001") {
                    const validationErrorData = e.response.data.data;
                    const errorMessage = validationErrorData[Object.keys(validationErrorData)[0]];
                    setError(errorMessage);
                } else {
                    setError(e.response.data.message || '게시판 저장하는 중 오류가 발생했습니다.');
                }
            } else {
                setError('게시판 저장하는 중 오류가 발생했습니다.');
            }
            throw e;
        }
    }

    const handleDelete = async (boardId) => {
        try {
            await api.delete(`/boards/${boardId}`);
            const newBoards = boards.filter(board => board.id !== boardId);
            setBoards(newBoards);
            alert('게시판이 삭제되었습니다.');
        } catch (e) {
            setError('게시판을 삭제하는 중 오류가 발생했습니다.');
        }
    }

    return (
        <div className="max-w-6xl mx-auto bg-white w-full p-4">
            <ErrorDialog message={error} onClose={()=>setError(null)}/>
            <div className="space-y-2">
                {boards.map(board => (
                    <BoardManagementListItem key={`board-${board.id}`} board={board} onSave={handleSave} onDelete={handleDelete}/>
                ))}
            </div>
        </div>
    );
}

export default BoardManagement;