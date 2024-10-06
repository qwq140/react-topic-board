import {useNavigate, useParams} from "react-router-dom";
import PostForm from "../../../components/PostForm";
import {useEffect, useState} from "react";
import api from "../../../api/api";

const PostEdit = () => {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;

        const fetching = async () => {
            try {
                const response = await api.get(`/posts/${postId}`);
                if(!ignore) {
                    setPost(response.data.data);
                }
            } catch (e) {
                if(!ignore) {
                    let errorMessage = '게시글 정보를 불러오는 중 에러가 발생하였습니다.';
                    if(e.response && e.response.data && e.response.data.message) {
                        errorMessage = e.response.data.message;
                    }
                    setError(errorMessage);
                }
            } finally {
                setLoading(false);
            }
        }

        fetching();

        return () => {
            ignore = true;
        }
    }, []);

    const handlePostSubmit = async (data) => {
        try {
            await api.put(`/posts/${postId}`, data);
            navigate(`/post/${postId}`);
        } catch (e) {
            let errorMessage = '게시글 수정 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.';
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

    if(loading)
        return (<div>로딩 중...</div>)
    if(error)
        return (<div>{error}</div>)
    return (
      <div className='max-w-6xl mx-auto bg-white w-full p-4'>
          {post && <PostForm boardId={post.board.id ?? 0} initialTitle={post.title ?? ''} initialContent={post.content ?? ''} onSubmit={handlePostSubmit}/>}
      </div>
    );
}

export default PostEdit;