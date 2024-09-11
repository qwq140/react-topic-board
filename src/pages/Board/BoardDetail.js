import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import BoardDetailInfo from "./components/BoardDetailInfo";
import PostTable from "./components/PostTable";

const BoardDetail = () => {
    const {boardId} = useParams();

    return (
        <div className='max-w-6xl mx-auto bg-white w-full p-4'>
            <BoardDetailInfo boardId={boardId}/>
            <PostTable boardId={boardId}/>
        </div>
    );
}

export default BoardDetail;