import {useState} from "react";

const BoardManagementListItem = ({
    board,
    onSave,
    onDelete
}) => {

    const [editName, setEditName] = useState(board.name);
    const [editDescription, setEditDescription] = useState(board.description);
    const [isEditing, setIsEditing] = useState(false);

    const handleCancel = () => {
        setIsEditing(false);
        setEditName(board.name);
        setEditDescription(board.description);
    }

    const handleSave = async () => {
        try {
            await onSave(board.id, editName, editDescription);
            setIsEditing(false);
        } catch (e) {
            setIsEditing(true);
        }
    }

    const handleDelete = () => {
        onDelete(board.id);
    }

    return (
        <div className='block p-4 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100'>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border rounded-md mb-2"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border rounded-md"
                        rows="3"
                    />
                </>
            ) : (
                <>
                    <div className="text-lg font-semibold">
                        {board.name}
                    </div>
                    <small className="text-gray-600">
                        {board.description}
                    </small>
                </>
            )}
            <div>
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="text-blue-500 mr-2"
                        >
                            저장
                        </button>
                        <button
                            onClick={handleCancel}
                            className="text-green-500 mr-2"
                        >
                            취소
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-500 mr-2"
                    >
                        수정
                    </button>
                )}
                <button
                    onClick={handleDelete}
                    className="text-red-500"
                >
                    삭제
                </button>
            </div>
        </div>
    );
}

export default BoardManagementListItem;