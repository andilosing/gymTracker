import { loginSuccess, registerSuccess, logout, resendEmailFailure, resendEmailSuccess, setError,clearError } from '../slices/authSlice';
import { baseQueryWithReauth,  } from '../../api/api';


export const loginUser = (credentials) => {
    return async (dispatch, getState) => {

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify(credentials)
                
            };
            

           const data = await baseQueryWithReauth("/auth/login", options, dispatch, getState)

           if (data.accessToken) {
            dispatch(loginSuccess(data));
           }
    } catch (error) {
        console.log(error)
        dispatch(setError({status: error.status, message: error.message }));
    }
    
    };
};

export const registerUser = (credentials) => {
    return async (dispatch, getState) => {
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify(credentials)
            };
            
            const data = await baseQueryWithReauth("/auth/register", options, dispatch, getState);
            
            console.log("Register response: " + JSON.stringify(data, null, 2));
            console.log(data);

            if (data.user) { // Wenn Ihr Server nach erfolgreicher Registrierung einen Zugriffstoken zurückgibt
                dispatch(registerSuccess(data)); // Sie sollten eine entsprechende Redux-Action namens "registerSuccess" erstellen
            } 
        } catch (error) {
            console.error('Registration error:', error);
            dispatch(setError({status: error.status, message: error.message }));
        }
    };
};

export const resendConfirmationEmail = (email) => {
    return async (dispatch, getState) => {
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({ email })
            };
            
           
            await baseQueryWithReauth("/auth/resend-confirmation-email", options, dispatch, getState);
            dispatch(resendEmailSuccess());
        } catch (error) {
            dispatch(setError({status: error.status, message: error.message }));
        }
    };
};



