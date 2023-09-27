import { useLocation, useNavigate, Navigate, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { resendConfirmationEmail } from "../redux/actions/authActions"
import { useEffect } from 'react';
import { clearError, setError } from '../redux/slices/authSlice';
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlice"

const RequireEmailConfirmation = () => {
    const location = useLocation()

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { resendEmailStatus, error } = useSelector(state => state.auth);

    useEffect(() => {
        if (resendEmailStatus) {
          dispatch(clearError())
        }

        
      }, [resendEmailStatus, error]);

      useEffect(() => {
        return () => {
            dispatch(clearError());
        }
      }, [])
  
      const handleResendConfirmation = () => {
        if (user && user.email) {
          dispatch(resendConfirmationEmail(user.email));
        } else {
            dispatch(setError({status: 400, message: "keine E-mail vorhanden!" }))
        }
      }

      const handleLogoutAndNavigateToLogin = () => {
        dispatch(logout());  
        navigate("/login");
      };

    

      return (
        <>
            {error && <div className="alert alert-error mb-4 fixed top-0 left-0 right-0 z-50">{error.status} {error.message}</div>}
    
            {user && user.email_verified
                ? <Outlet />
                : 
                <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white p-6">
                    <div className="max-w-md w-full bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
                        <h2 className="text-3xl font-bold mb-6 text-center">E-Mail-Bestätigung</h2>
                        
                        <p className="text-lg text-center">Bitte bestätigen Sie Ihre E-Mail-Adresse, um fortzufahren.</p>
    
                        <div>
                            <button onClick={handleResendConfirmation} className="btn btn-primary w-full">Bestätigungs-E-Mail erneut senden</button>
                        </div>
    
                        {resendEmailStatus && resendEmailStatus 
                            ? <div className="alert alert-success mt-4">E-Mail wurde erfolgreich zugestellt</div>
                            : null
                        }
    
                        <div className="mt-6 text-center">
                            <p className="text-base">Email Adresse bereits bestätigt?</p>
                            <span onClick={handleLogoutAndNavigateToLogin} className="cursor-pointer underline mt-2 inline-block">Hier zum Login</span>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default RequireEmailConfirmation