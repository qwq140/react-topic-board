import {useParams} from "react-router-dom";
import PostDetailBody from "./components/PostDetailBody";

const PostDetail = () => {
    const {postId} = useParams();

    return (
        <div className="max-w-6xl mx-auto bg-white w-full p-4">
            <PostDetailBody postId={postId}/>
        </div>
    );

}

export default PostDetail;