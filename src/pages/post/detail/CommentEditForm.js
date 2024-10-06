import {useState} from "react";

const CommentEditForm = ({currentContent, onSave, onCancel}) => {
    const [content, setContent] = useState(currentContent);

    const handleSave = () => {
        if(!content.trim()) {
            alert("댓글을 작성해주세요.");
            return;
        }
        onSave(content);
    }

    return (
        <div className="space-y-2">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='댓글을 작성하세요...'
                className='w-full p-2 border border-gray-300 rounded-lg'
                rows='4'
            />
            <div className='flex space-x-2'>
                <button
                    className='bg-blue-500 text-white px-4 py-2 rounded'
                    onClick={handleSave}
                >
                    저장
                </button>
                <button
                    className='bg-gray-500 text-white px-4 py-2 rounded'
                    onClick={onCancel}
                >
                    취소
                </button>
            </div>
        </div>
    );
}

export default CommentEditForm;