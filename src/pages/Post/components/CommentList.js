import {useEffect, useState} from "react";
import api from "../../../api/api";
import CommentForm from "./CommentForm";
import {useAuth} from "../../../context/AuthContext";
import CommentEditForm from "./CommentEditForm";

const CommentList = ({ postId, handleError}) => {
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);

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

    const handleCommentDelete = async (commentId) => {
        try {
            await api.delete(`/comments/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
            alert("댓글 삭제했습니다.");
        } catch (e) {
            let errorMessage = '댓글 삭제 중 오류가 발생했습니다.';
            if (e.response && e.response.data && e.response.data.message) {
                errorMessage = e.response.data.message;
            }
            handleError(errorMessage);
        }
    }

    const handleCommentEdit = async (commentId, updatedContent) => {
        try {
            const response = await api.put(`/comments/${commentId}`, { content: updatedContent });
            setComments(comments.map(comment =>
                comment.id === commentId ? response.data.data : comment
            ));
            setEditingComment(null);
            alert("댓글 수정했습니다.");
        } catch (e) {
            let errorMessage = '댓글 수정 중 오류가 발생했습니다.';
            if (e.response && e.response.data && e.response.data.message) {
                errorMessage = e.response.data.message;
            }
            handleError(errorMessage);
        }
    }

    return (
        <div className='mt-4'>
            <h2 className='text-xl font-bold mb-2'>댓글</h2>
            {comments.length > 0 ? (
                <ul className='space-y-4'>
                    {comments.map((comment) => (
                        <li key={comment.id} className='border p-2 rounded'>
                            {editingComment === comment.id ? (
                                <CommentEditForm
                                    currentContent={comment.content}
                                    onSave={(updatedContent) => handleCommentEdit(comment.id, updatedContent)}
                                    onCancel={() => setEditingComment(null)}
                                />
                            ) : (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="text-sm font-semibold">{comment.author.nickname}</div>
                                            <div className="text-xs text-gray-500">{comment.createdDate}</div>
                                        </div>
                                        {authState.isAuth && (
                                            <div className='flex space-x-2'>
                                                <button
                                                    className='text-blue-500 text-xs font-medium'
                                                    onClick={() => setEditingComment(comment.id)}
                                                >
                                                    수정
                                                </button>
                                                <button
                                                    className='text-red-500 text-xs font-medium'
                                                    onClick={() => handleCommentDelete(comment.id)}
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className='text-base'>{comment.content}</div>
                                </>
                            )}
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