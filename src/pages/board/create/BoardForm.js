import {useEffect, useState} from "react";
import CustomButton from "../../../components/CustomButton";
import ErrorDialog from "../../../components/ErrorDialog";

const BoardForm = ({onSubmit, initialName = '', initialDescription = ''}) => {
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);
    const [error, setError] = useState(null);

    useEffect(() => {
        setName(initialName);
        setDescription(initialDescription);
    }, [initialName, initialDescription]);

    const handleSubmit = async () => {
        if(!name.trim()) {
            setError('게시판 이름을 입력해주세요');
            return;
        }

        try {
            await onSubmit({name, description});
        } catch (e) {
            if(e.response && e.response.data) {
                if(e.response.data.errorCode === "VALIDATION-001") {
                    const validationErrorData = e.response.data.data;
                    const errorMessage = validationErrorData[Object.keys(validationErrorData)[0]];
                    setError(errorMessage);
                } else {
                    setError(e.response.data.message);
                }
            } else {
                setError('처리 중 오류가 발생했습니다.');
            }
        }
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            {error && <ErrorDialog message={error} onClose={() => setError(null)}/>}
            <h2 className="text-2xl font-semibold mb-4">게시판 등록</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">게시판 이름</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">게시판 설명</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border rounded-md"
                        rows="4"
                    />
                </div>
                <div className="flex justify-end">
                    <CustomButton onClick={handleSubmit}>등록</CustomButton>
                </div>
            </form>
        </div>
    );
}

export default BoardForm;