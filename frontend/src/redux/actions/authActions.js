import { loginSuccess, registerSuccess, logout } from '../slices/authSlice';
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
            } else {
                // Fehlerbehandlung
            }
        } catch (error) {
            console.error('Login error:', error);
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
            } else {
                // Fehlerbehandlung, z.B. dispatch(registerFailure(data));
            }
        } catch (error) {
            console.error('Registration error:', error);
            // Hier könnten Sie auch eine registerError Action versenden, um Fehler im Redux Store zu speichern
        }
    };
};



