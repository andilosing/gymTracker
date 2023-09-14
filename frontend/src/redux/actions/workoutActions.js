
import { setWorkouts, setError } from '../slices/workoutSlice';
import { baseQueryWithReauth } from '../../api/api';

export const fetchWorkouts = () => {
    return async (dispatch, getState) => {
        try {
            const options = {
                method: 'GET',
            };

            const data = await baseQueryWithReauth("/workouts", options, dispatch, getState);

            if (Array.isArray(data)) { 
                dispatch(setWorkouts(data));
            } else {
                dispatch(setError({status: "Error", message: "Data is not in expected format" }));
            }

        } catch (error) {
            console.error('Error fetching workouts:', error);
            dispatch(setError({status: error.status, message: error.message }));
        }
    };
};