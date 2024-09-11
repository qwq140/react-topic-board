import {useEffect, useState} from "react";
import api from "../api/api";
import BoardListItem from "../components/BoardListItem";

const Home = () => {

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        let ignore = false;

        async function dataFetching() {
            try {
                const response = await api.get('/boards');
                const data = response.data.data;
                if(!ignore) {
                    setBoards([...data.boards]);
                }
            } catch (error) {
                console.log(error);
            }
        }

        dataFetching();

        return () => {
            ignore = true;
        }
    },[]);

    return (
        <div className="max-w-6xl mx-auto bg-white w-full p-4">
            <div className="space-y-2">
                {boards.map(board => (
                    <BoardListItem key={`board-${board.id}`} id={board.id} name={board.name} description={board.description}/>
                ))}
            </div>
        </div>
    );
}


export default Home;