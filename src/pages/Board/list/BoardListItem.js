import {Link} from "react-router-dom";

const BoardListItem = ({id, name, description}) => {
    return (
        <Link to={`/board/${id}`} className='block p-4 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100'>
            <div className="text-lg font-semibold">
                {name}
            </div>
            <small className="text-gray-600">
                {description}
            </small>
        </Link>
    );
}

export default BoardListItem;