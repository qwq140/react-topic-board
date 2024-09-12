import {useEffect, useState} from "react";
import api from "../../../api/api";
import CommentForm from "./CommentForm";
import {useAuth} from "../../../context/AuthContext";

const CommentList = ({ postId, handleError}) => {
    const [comments, setComments] = useState([]);

    const {state : authState} = useAuth();

    useEffect(() => {
        let ignore = false;
        const fetchComments = async () => {
            try {
                const response = await api.get(`/posts/${postId}/comments`);
                if(!ignore) {
                    setComments(response.data.data.comments);
                }
            } catch (e) {
                let errorMessage = '댓글을 불러오는 중 오류가 발생했습니다.';
                if(e.response && e.response.data && e.response.data.message) {
                    errorMessage = e.response.data.message;
                }
                handleError(errorMessage);
            }
        };

        fetchComments();

        return () => {
            ignore =true;
        }

    }, [postId]);

    const handleCommentAdd = (newComment) => {
        setComments([...comments, newComment]);
    }

    return (
        <div className='mt-4'>
            <h2 className='text-xl font-bold mb-2'>댓글</h2>
            {comments.length > 0 ? (
                <ul className='space-y-4'>
                    {comments.map((comment) => (
                        <li key={comment.id} className='border p-2 rounded'>
                            <p className='text-sm text-gray-800'>{comment.content}</p>
                            <p className='text-xs text-gray-500'>
                                작성자: {comment.author.nickname} | 작성일: {comment.createdDate}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>댓글이 없습니다.</div>
            )}

            {authState.isAuth && <CommentForm postId={postId} onCommentAdded={handleCommentAdd}/>}
        </div>
    );
};

export default CommentList;