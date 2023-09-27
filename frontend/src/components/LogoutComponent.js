import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from "../redux/slices/authSlice"
import { useNavigate } from 'react-router-dom';

function LogoutComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); // Ersetzen Sie "IhreLogoutAction" durch den tatsächlichen Namen Ihrer Logout-Action.
        navigate('/login');
    };

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white p-6">
            <button 
                onClick={handleLogout} 
                className="btn btn-primary w-full mt-4"
            >
                Logout
            </button>
        </div>
    );
}
export default LogoutComponent;