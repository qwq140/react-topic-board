import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/User/Signup";
import Login from "./pages/User/Login";
import BoardList from "./pages/Board/BoardList";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import Header from "./components/Header";
import BoardDetail from "./pages/Board/BoardDetail";
import PostWrite from "./pages/Post/PostWrite";
import ProtectedRoute from "./route/ProtectedRoute";
import {useContext} from "react";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                    <Header/>
                    <div className="flex flex-grow bg-gray-200">
                        <Routes>
                            <Route path="/" element={<BoardList/>}/>
                            <Route path="/board/:boardId" element={<BoardDetail/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/board/:boardId/post/write" element={
                                <ProtectedRoute>
                                    <PostWrite/>
                                </ProtectedRoute>
                            }/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
