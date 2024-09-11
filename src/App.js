import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {AuthProvider} from "./context/AuthContext";
import Header from "./components/Header";
import BoardDetail from "./pages/BoardDetail";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                    <Header/>
                    <div className="flex flex-grow bg-gray-200">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/board/:boardId" element={<BoardDetail/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
