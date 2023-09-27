import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logout } from "../redux/slices/authSlice"
import { useDispatch } from 'react-redux';

function EmailConfirmationComponent() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [confirmationStatus, setConfirmationStatus] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        async function confirm() {
            try {
                const response = await fetch(`https://reprise-api.onrender.com/auth/confirm-email/${token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 201) {
                    const data = await response.json();
                    setConfirmationStatus(data.message);
                } else {
                    const errorData = await response.json();
                    setConfirmationStatus(errorData.message || 'Fehler bei der E-Mail-Bestätigung.');
                }
            } catch (error) {
                setConfirmationStatus('Fehler bei der E-Mail-Bestätigung.');
            }
        }
        confirm();
    }, [token]);

    function handleLogoutAndNavigate() {
        dispatch(logout()); // Ersetzen Sie "IhreLogoutAction" durch den tatsächlichen Namen Ihrer Logout-Action.
        navigate('/login');
    }

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white p-6">
            <div className="max-w-md w-full bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
                <div className="text-center space-y-4">
                    {confirmationStatus ? (
                        <p className="text-lg">{confirmationStatus}</p>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-lg">Bestätigung läuft...</p>
                            <div className="mt-4 loader"></div>
                        </div>
                    )}
                    <button 
                        onClick={handleLogoutAndNavigate} 
                        className="btn btn-primary w-full mt-4"
                    >
                        Zum Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmailConfirmationComponent;
