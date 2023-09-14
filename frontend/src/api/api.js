import { setCredentials, logout } from "../redux/slices/authSlice";

const BASE_URL = 'http://localhost:8080';

async function baseFetch(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
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
       
        const data = await baseFetch(endpoint, options);
        
        return  data ;
    } catch (error) {
        // Überprüfen Sie, ob der Fehler ein 403 ist
        if (error.message.includes("403")) {
            console.log('sending refresh token');
            
            // Refresh-Token-Anfrage
            try {
                const refreshTokenData = await baseFetch('/refresh-token', options);
                
                const user = getState().auth.user;
                dispatch(setCredentials({ ...refreshTokenData, user }));

                // Versuchen Sie erneut die ursprüngliche Anfrage mit neuem Token
                const retryData = await baseFetch(endpoint, {
                    ...options,
                    headers: {
                        ...options.headers,
                        'Authorization': `Bearer ${refreshTokenData.token}`
                    }
                });
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

