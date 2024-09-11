import {useNavigate, useParams} from "react-router-dom";
import BoardDetailInfo from "../../components/BoardDetailInfo";
import PostForm from "./components/PostForm";
import api from "../../api/api";
import {useErrorHandler} from "../../error/useErrorHandler";

const PostWrite = () => {
    const {boardId} = useParams();
    const handleError = useErrorHandler();

    const handlePostSubmit = async (data) => {
        return api.post(`/boards/${boardId}/posts`, data);
    }

    return (
      <div className='max-w-6xl mx-auto bg-white w-full p-4'>
          <BoardDetailInfo boardId={boardId} handleError={handleError}/>
          <PostForm onSubmit={handlePostSubmit} boardId={boardId}/>
      </div>
    );
}

export default PostWrite;