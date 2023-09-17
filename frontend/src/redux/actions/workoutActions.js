
import { setWorkoutHistory, setError, startWorkout } from '../slices/workoutSlice';
import { baseQueryWithReauth } from '../../api/api';

export const fetchWorkoutsHistory = () => {
    return async (dispatch, getState) => {
        try {
            const options = {
                method: 'GET',
            };

            const data = await baseQueryWithReauth("/workouts", options, dispatch, getState);
            console.log("abgerufende workout: ", data)

            if (Array.isArray(data)) { 
                dispatch(setWorkoutHistory(data));
            } else {
                dispatch(setError({status: "Error", message: "Data is not in expected format" }));
            }

        } catch (error) {
            console.error('Error fetching workouts:', error);
            dispatch(setError({status: error.status, message: error.message }));
        }
    };
};

export const beginWorkout = () => {
    return async (dispatch, getState) => {
        try {
            const options = {
                method: 'POST',
            };

            const data = await baseQueryWithReauth("/workouts/", options, dispatch, getState);
            console.log("Gestartetes Workout: ", data)

            if (data && data.id && data.start_time) { 
                dispatch(startWorkout({ id: data.id, startTime: data.start_time }));
            } else {
                dispatch(setError({status: "Error", message: "Data is not in expected format" }));
            }

        } catch (error) {
            console.error('Error starting workout:', error);
            dispatch(setError({status: error.status, message: error.message }));
        }
    };
};