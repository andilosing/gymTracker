import { setCredentials, logout } from "../redux/slices/authSlice";

const BASE_URL = 'http://localhost:8080';



async function baseFetch(endpoint, options = {}, dispatch, getState) {

    

    const token = getState().auth.token

    console.log(token)

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : undefined,
            ...options.headers,
        },
        credentials: 'include',
    });

    

    if (!response.ok) {
       
        const errorData = await response.json();
        throw {
            message: errorData.error,
            status: response.status
        } //new Error(errorData.error || 'An error occurred');
    }

    

    return response.json();
}

async function baseQueryWithReauth(endpoint, options = {}, dispatch, getState) {
    try {
        // Erste Anfrage
       
        const data = await baseFetch(endpoint, options, dispatch, getState);
        
        return  data ;
    } catch (error) {
        // Überprüfen Sie, ob der Fehler ein 403 ist
        console.log(error)
        if (error.status === 403) {
            console.log('sending refresh token');
            
            // Refresh-Token-Anfrage
            try {
                const refreshTokenData = await baseFetch('/auth/refresh-token', {
                    ...options,
                    method: 'POST'},
                     dispatch, getState);

                     console.log(refreshTokenData.accessToken)
                
                const user = getState().auth.user;
                dispatch(setCredentials( {token: refreshTokenData.accessToken, user }));

                // Versuchen Sie erneut die ursprüngliche Anfrage mit neuem Token
                const retryData = await baseFetch(endpoint, {
                    ...options,
                    headers: {
                        ...options.headers,
                        'Authorization': `Bearer ${refreshTokenData.accessToken}`
                    }
                }, dispatch, getState);
                return { data: retryData };
            } catch (refreshError) {
                dispatch(logout());
                throw refreshError;
            }
        }
        throw error;
    }
}

export { baseFetch, baseQueryWithReauth };

