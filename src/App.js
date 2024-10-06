import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/User/signup/Signup";
import Login from "./pages/User/login/Login";
import BoardList from "./pages/Board/list/BoardList";
import {AuthProvider} from "./context/AuthContext";
import Header from "./components/Header";
import BoardDetail from "./pages/Board/detail/BoardDetail";
import PostWrite from "./pages/Post/write/PostWrite";
import ProtectedRoute from "./route/ProtectedRoute";
import PostEdit from "./pages/Post/edit/PostEdit";
import BoardCreate from "./pages/Board/create/BoardCreate";
import BoardManagement from "./pages/Board/management/BoardManagement";
import {useAxiosInterceptors} from "./api/api";
import PostDetail from "./pages/Post/detail/PostDetail";

function App() {
    return (
        <AuthProvider>
            <MainComponent/>
        </AuthProvider>
    );
}

function MainComponent() {
    useAxiosInterceptors();

    return (
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
                        <Route path="/post/:postId/edit" element={
                            <ProtectedRoute>
                                <PostEdit/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/post/:postId" element={<PostDetail/>}/>
                        <Route path="/board/create" element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <BoardCreate/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/board/management" element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <BoardManagement/>
                            </ProtectedRoute>
                        }/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
