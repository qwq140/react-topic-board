import {useState} from "react";
import api from "../../../api/api";
import ErrorDialog from "../../../components/ErrorDialog";

const CommentForm = ({onCommentAdded, loading}) => {

    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const handleCommentSubmit = (e) => {
        if(!comment.trim()) {
            alert('댓글을 입력해주세요');
            return;
        }
        onCommentAdded(comment);
        setComment('');
    };

    return (
        <div className="mt-4">
            <form className='mt-4'>
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
                    disabled={loading}
                    className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                >
                    {loading ? '제출 중...' : '댓글 작성'}
                </button>
            </form>
        </div>
    );
}

export default CommentForm;