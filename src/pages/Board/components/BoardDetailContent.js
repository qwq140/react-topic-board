import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../../api/api";
import Pagination from "./Pagination";
import PostTable from "./PostTable";
import CustomButton from "../../../components/CustomButton";
import {useAuth} from "../../../context/AuthContext";

const BoardDetailContent = ({boardId, handleError}) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const {state : authState} = useAuth();

    useEffect(() => {
        let ignore = false;

        async function fetching() {
            try {
                const response = await api.get(`/boards/${boardId}/posts?page=${currentPage-1}&size=20`);
                const data = response.data.data;
                if(!ignore) {
                    const posts = [...data.posts];
                    setPosts(posts);

                    const totalPages = data.totalPages === 0 ? 1 : data.totalPages;
                    setTotalPages(totalPages);
                }
            } catch (e) {
                if(!ignore) {
                    let errorMessage = '게시글 목록을 불러오는 중 오류가 발생하였습니다.';
                    if(e.response.data && e.response.data.message) {
                        errorMessage = e.response.data.message;
                    }
                    handleError(errorMessage);
                }
            }

        }

        fetching();

        return () => {
            ignore = true;
        }

    }, [boardId, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div>
            <PostTable posts={posts} boardId={boardId}/>
            {authState.isAuth && <div className='mt-3 flex justify-end'>
                <CustomButton onClick={() => navigate(`/board/${boardId}/post/write`)}>글쓰기</CustomButton>
            </div>}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>
    );
}

export default BoardDetailContent;