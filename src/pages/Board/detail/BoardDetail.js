import {useParams} from "react-router-dom";
import BoardDetailInfo from "../../../components/BoardDetailInfo";
import BoardDetailContent from "./BoardDetailContent";
import {useErrorHandler} from "../../../error/useErrorHandler";

const BoardDetail = () => {
    const {boardId} = useParams();
    const handleError = useErrorHandler();

    return (
        <div className='max-w-6xl mx-auto bg-white w-full p-4'>
            <BoardDetailInfo boardId={boardId} handleError={handleError}/>
            <BoardDetailContent boardId={boardId} handleError={handleError}/>
        </div>
    );
}

export default BoardDetail;