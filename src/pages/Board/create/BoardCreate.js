import BoardForm from "./BoardForm";
import api from "../../../api/api";
import {useNavigate} from "react-router-dom";

const BoardCreate = () => {

    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        console.log(data);
        try {
            await api.post('/boards', data);
            navigate('/');
        } catch (e) {
            throw e;
        }
    }

    return (
        <div className="max-w-6xl mx-auto bg-white w-full p-4">
            <BoardForm onSubmit={handleSubmit}/>
        </div>
    );
};

export default BoardCreate;