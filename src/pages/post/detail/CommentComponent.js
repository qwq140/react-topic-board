import {useEffect, useState} from "react";
import api from "../../../api/api";
import {useAuth} from "../../../context/AuthContext";
import CommentForm from "./CommentForm";
import CommentEditForm from "./CommentEditForm";

const CommentComponent = ({ postId}) => {
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);

    const [loading, setLoading] = useState(true); // 댓글 리스트 조회 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const [isSubmitting, setIsSubmitting] = useState(false); // 댓글 작성 및 삭제 로딩 상태
    const {isAuthenticated} = useAuth();

    useEffect(() => {
        let ignore = false;
        const fetchComments = async () => {
            setLoading(true);
            setError(null);
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
                setError(errorMessage);
            } finally {
                if(!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchComments();

        return () => {
            ignore = true;
        }

    }, [postId]);

    // 댓글 작성
    const handleCommentAdd = async (newCommentContent) => {
        setIsSubmitting(true);
        try {
            const response = await api.post(`/posts/${postId}/comments`, { content: newCommentContent });
            setComments([...comments, response.data.data]);
        } catch (e) {
            if(e.response && e.response.data) {
                if(e.response.data.errorCode === "VALIDATION-001"){
                    const validationErrorData = e.response.data.data;
                    const errorMessage = validationErrorData[Object.keys(validationErrorData)[0]];
                    alert(errorMessage);
                } else {
                    alert(e.response.data.message || '처리 중 오류가 발생했습니다.');
                }
            } else {
                alert("처리 중 오류가 발생했습니다.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    // 댓글 삭제
    const handleCommentDelete = async (commentId) => {
        setIsSubmitting(true);
        try {
            await api.delete(`/comments/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
            alert("댓글 삭제했습니다.");
        } catch (e) {
            let errorMessage = '댓글 삭제 중 오류가 발생했습니다.';
            if (e.response && e.response.data && e.response.data.message) {
                errorMessage = e.response.data.message;
            }
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    // 댓글 수정
    const handleCommentEdit = async (commentId, updatedContent) => {
        setIsSubmitting(true)
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
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='mt-4'>
            <h2 className='text-xl font-bold mb-2'>댓글</h2>
            {loading ? (
                <p>로딩 중...</p>
            ) : error ? (
                <p>{error}</p>
            ) : comments.length > 0 ? (
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
                                        {isAuthenticated && (
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
            {isAuthenticated && <CommentForm loading={isSubmitting} onCommentAdded={handleCommentAdd}/>}
        </div>
    );
};

export default CommentComponent;