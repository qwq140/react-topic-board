import {useState} from "react";
import CustomButton from "../../../components/CustomButton";
import api from "../../../api/api";
import {useNavigate} from "react-router-dom";
import ErrorDialog from "../../../components/ErrorDialog";

const PostForm = ({boardId}) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if(!title.trim()) {
            setError('제목을 입력해주세요');
            return;
        }
        if(!content.trim()) {
            setError('내용을 입력해주세요');
            return;
        }

        try {
            await api.post(`/boards/${boardId}/posts`, {title, content});
            navigate(`/board/${boardId}`);
        } catch (e) {
            if(e.response.data.errorCode === "VALIDATION-001"){
                const validationErrorData = e.response.data.data;
                const errorMessage = validationErrorData[Object.keys(validationErrorData)[0]];
                setError(errorMessage);
            } else {
                if(e.response.data.message) {
                    setError(e.response.data.message);
                } else {
                    setError('게시글 작성 중 오류가 발생하였습니다. 잠시 후 시도해주세요');
                }
            }

        }
    }

    const handleCloseErrorDialog = () => setError('');

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">게시글 작성</h2>

            <ErrorDialog message={error} onClose={handleCloseErrorDialog}/>

            <form>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        제목
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                        내용
                    </label>
                    <textarea
                        id="content"
                        rows="10"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end">
                    <CustomButton onClick={handleSubmit}>작성하기</CustomButton>
                </div>
            </form>
        </div>
    );
}

export default PostForm;