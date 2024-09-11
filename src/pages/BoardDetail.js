import {useParams} from "react-router-dom";

const BoardDetail = () => {
    const {boardId} = useParams();

    return (
      <div>{boardId}</div>
    );
}

export default BoardDetail;