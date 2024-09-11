const ErrorDialog = ({message, onClose}) => {
    if(!message) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-bold mb-4">오류</h3>
                <p className="mb-4">{message}</p>
                <div className='flex justify-end'>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={onClose}
                    >
                        닫기
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ErrorDialog;