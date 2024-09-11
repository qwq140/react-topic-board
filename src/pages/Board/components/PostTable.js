import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../../api/api";
import Pagination from "./Pagination";
import {post} from "axios";

const PostTable = ({posts, boardId}) => {

    const navigate = useNavigate();

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
            <tr>
                <th scope="col"
                    className="px-6 py-3 text-center text-sm font-medium text-gray-500 w-3/4">제목
                </th>
                <th scope="col"
                    className="px-6 py-3 text-center text-sm font-medium text-gray-500 w-1/8">글쓴이
                </th>
                <th scope="col"
                    className="px-6 py-3 text-center text-sm font-medium text-gray-500 w-1/8">작성일
                </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {posts.map(post => (
                <tr
                    key={post.id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/post/${post.id}`)}
                >
                    <td className="px-6 py-4 text-sm text-gray-900">{post.title}</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900">{post.author.nickname}</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900">{post.createdDate}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};


export default PostTable;