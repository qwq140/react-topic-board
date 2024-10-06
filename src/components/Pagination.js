const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const pageGroup = 5;

    const handlePageClick = (page) => {
        if(page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    }

    const handlePrevGroupClick = () => {
        const newPage = Math.max(1, currentPage - pageGroup);
        onPageChange(newPage);
    }

    const handleNextGroupClick = () => {
        const newPage = Math.min(totalPages, currentPage+5);
        onPageChange(newPage);
    }


    const getPageNumbers = () => {
        const start = Math.max(1, Math.floor((currentPage - 1) / 5) * 5 + 1);
        const end = Math.min(totalPages, start + 4);
        return Array.from({length : end - start + 1}, (_, index) => start+index);
    }

    return (
        <div className='flex justify-center'>
            <div className="flex justify-between items-center py-4 space-x-2">
                <button
                    onClick={handlePrevGroupClick}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 disabled:opacity-50"
                >
                    &lt;
                </button>
                <div className="flex space-x-2">
                    {getPageNumbers().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleNextGroupClick}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 disabled:opacity-50"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}


export default Pagination;