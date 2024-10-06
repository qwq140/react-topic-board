import {useNavigate, useParams} from "react-router-dom";
import PostForm from "../../../components/PostForm";
import api from "../../../api/api";

const PostWrite = () => {
    const {boardId} = useParams();
    const navigate = useNavigate();

    const handlePostSubmit = async (data) => {
        try {
            const response = await api.post(`/boards/${boardId}/posts`, data);
            const responseData = response.data.data;
            navigate(`/post/${responseData.id}`);
        } catch (e) {
            let errorMessage = "게시글 작성 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요";
            if(e.response && e.response.data) {
                if(e.response.data.errorCode === "VALIDATION-001") {
                    const validationErrorData = e.response.data.data;
                    errorMessage = validationErrorData[Object.keys(validationErrorData)[0]];
                    alert(errorMessage);
                } else {
                    errorMessage = e.response.data.message;
                    alert(errorMessage);
                }
            } else {
                alert(errorMessage);
            }
        }

    }

    return (
      <div className='max-w-6xl mx-auto bg-white w-full p-4'>
          <PostForm onSubmit={handlePostSubmit} boardId={boardId}/>
      </div>
    );
}

export default PostWrite;