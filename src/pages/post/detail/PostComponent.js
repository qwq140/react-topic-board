import CustomButton from "../../../components/CustomButton";
import {useAuth} from "../../../context/AuthContext";
import {useEffect, useState} from "react";
import api from "../../../api/api";
import {useNavigate} from "react-router-dom";

const PostComponent = ({postId}) => {

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const {isAuthenticated, user} = useAuth();

    useEffect(() => {

        let ignore = false;

        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${postId}`);
                if(!ignore) {
                    setPost(response.data.data);
                }
            } catch (e) {
                let errorMessage = '게시글을 불러오는 중 오류가 발생했습니다.';
                if(e.response && e.response.data && e.response.data.message) {
                    errorMessage = e.response.data.message;
                }
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();

        return () => {
            ignore = true;
        }

    }, [postId]);

    const handleDelete = async () => {
        try {
            await api.delete(`/posts/${postId}`); // 게시글 삭제 API 호출
            alert('게시글이 삭제되었습니다.');
            navigate('/'); // 메인 페이지로 이동
        } catch (err) {
            setError('게시글을 삭제하는 중 오류가 발생했습니다.');
        }
    };

    if(loading)
        return <div>로딩중....</div>;
    if(error)
        return <div>{error}</div>;
    if(!post)
        return <div>게시물을 찾지 못했습니다.</div>;

    return (
        <>
            <h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
            <p className='text-sm text-gray-600 mb-2'>
                작성자: {post.author.nickname} | 작성일: {post.createdDate}
            </p>
            <div className='border-t border-b py-4'>
                <p>{post.content}</p>
            </div>
            <div className='mt-4 flex justify-end space-x-2'>
                <CustomButton onClick={() => navigate(`/board/${post.board.id}`)}>목록</CustomButton>
                {isAuthenticated && user.id === post.author.id && <CustomButton onClick={() => navigate(`/post/${postId}/edit`)} className="bg-green-500 text-white hover:bg-green-600">수정</CustomButton>}
                {isAuthenticated && user.id === post.author.id && <CustomButton onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600">삭제</CustomButton>}
            </div>
        </>
    );
}

export default PostComponent;