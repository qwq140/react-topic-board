import {useParams} from "react-router-dom";
import PostComponent from "./PostComponent";
import CommentComponent from "./CommentComponent";

const PostDetail = () => {
    const {postId} = useParams();

    return (
        <div className="max-w-6xl mx-auto bg-white w-full p-4">
            <PostComponent postId={postId}/>
            <CommentComponent postId={postId}/>
        </div>
    );

}

export default PostDetail;