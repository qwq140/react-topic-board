import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { state, dispatch } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch({
           type : 'LOGOUT'
        });
        navigate('/');
    }

    return (
        <nav className="bg-gray-800">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        <div>
                            <Link to="/" className="flex items-center py-5 px-2 text-white font-bold">
                                Home
                            </Link>
                        </div>
                        <div className="flex items-center space-x-1">
                            {state.user && state.user.roles.includes('ADMIN') && <Link to="/board/create" className="py-5 px-3 text-white hover:text-gray-300">게시판 등록</Link>}
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        {!state.isAuth && (
                            <>
                                <Link to="/login" className="py-5 px-3 text-white hover:text-gray-300">Login</Link>
                                <Link to="/signup" className="py-5 px-3 text-white hover:text-gray-300">Signup</Link>
                            </>
                        )}
                        {state.isAuth && (
                            <div className="py-5 px-3 text-white hover:text-gray-300 cursor-pointer" onClick={handleLogout}>Logout</div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
