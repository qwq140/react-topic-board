import {useParams} from "react-router-dom";
import BoardDetailInfo from "../../components/BoardDetailInfo";
import PostForm from "./components/PostForm";

const PostWrite = () => {
    const {boardId} = useParams();

    return (
      <div className='max-w-6xl mx-auto bg-white w-full p-4'>
          <BoardDetailInfo boardId={boardId}/>
          <PostForm boardId={boardId}/>
      </div>
    );
}

export default PostWrite;