import {useNavigate, useParams} from "react-router-dom";
import PostForm from "./components/PostForm";
import {useEffect, useState} from "react";
import api from "../../api/api";
import {useErrorHandler} from "../../error/useErrorHandler";

const PostEdit = () => {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const handleError = useErrorHandler();
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
                    handleError(errorMessage);
                }
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
            throw e;
        }
    }


    return (
      <div className='max-w-6xl mx-auto bg-white w-full p-4'>
          {post && <PostForm boardId={post.board.id ?? 0} initialTitle={post.title ?? ''} initialContent={post.content ?? ''} onSubmit={handlePostSubmit}/>}
      </div>
    );
}

export default PostEdit;