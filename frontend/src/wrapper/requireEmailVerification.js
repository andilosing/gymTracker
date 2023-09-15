import { useLocation, useNavigate, Navigate, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { resendConfirmationEmail } from "../redux/actions/authActions"
import { useEffect } from 'react';
import { clearError, setError } from '../redux/slices/authSlice';
import { Link } from "react-router-dom";

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

      const goToLogin = () => {
        console.log("ich wurde aufgerufen")
        navigate("/login");
      }

    

    return (
        <>
        {error && <p className="error">{error.status} {error.message}</p>}
        {user && user.email_verified
            ? <Outlet />
            : <div>
            <p>Bitte bestätigen Sie Ihre E-Mail-Adresse.</p>
            <button onClick={handleResendConfirmation}>Bestätigungs-E-Mail erneut senden</button> 
            
            
            {resendEmailStatus && resendEmailStatus ? <div>  E-Mail wurde erfolgreich zugestellt  </div> :<></> }

            <div>
                Email Adresse bereits bestätigt?   <Link to="/"> Hier zum Login </Link>
            </div>
            </div> }
            
            
          

        </>
        
    )
}
export default RequireEmailConfirmation