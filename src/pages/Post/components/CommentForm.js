import {useState} from "react";
import api from "../../../api/api";
import ErrorDialog from "../../../components/ErrorDialog";

const CommentForm = ({postId, onCommentAdded}) => {

    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);


    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const handleCommentSubmit = async () => {
        if(!comment.trim()) {
            setError('댓글을 입력해주세요');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await api.post(`/posts/${postId}/comments`, { content: comment });
            setComment('');
            onCommentAdded(response.data.data);
        } catch (e) {
            if(e.response.data.errorCode === "VALIDATION-001"){
                const validationErrorData = e.response.data.data;
                const errorMessage = validationErrorData[Object.keys(validationErrorData)[0]];
                setError(errorMessage);
            } else {
                if(e.response.data.message) {
                    setError(e.response.data.message);
                } else {
                    setError('댓글을 작성하는 중 오류가 발생했습니다.');
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-4">
            <ErrorDialog message={error} onClose={()=>setError(null)}/>
            <form onSubmit={handleCommentSubmit} className='mt-4'>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder='댓글을 작성하세요...'
                    className='w-full p-2 border border-gray-300 rounded-lg'
                    rows='4'
                />
                <button
                    type='button'
                    onClick={handleCommentSubmit}
                    disabled={isSubmitting}
                    className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                >
                    {isSubmitting ? '제출 중...' : '댓글 작성'}
                </button>
            </form>
        </div>

    );
}

export default CommentForm;