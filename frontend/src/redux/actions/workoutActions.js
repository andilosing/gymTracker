
import { fetchData, setError, startWorkout, addWorkoutToHistory } from '../slices/workoutSlice';
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
                dispatch(fetchData(data));
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


export const endWorkout = (workoutId) => {
    return async (dispatch, getState) => {
        try {
            // Sicherstellen, dass eine workoutId bereitgestellt wurde
            if (!workoutId) {
                throw new Error("No workout ID provided.");
            }

            const options = {
                method: 'PUT',
            };

            // Hinzufügen der workoutId zum Pfad
            const data = await baseQueryWithReauth(`/workouts/${workoutId}`, options, dispatch, getState);
            console.log("Beendetes Workout: ", data)

            // Hier kannst du überprüfen, ob die Daten wie erwartet zurückgegeben werden und gegebenenfalls einen Dispatch auslösen
            if (data && data.id && data.end_time) { 
                dispatch(addWorkoutToHistory(data));
            } else {
                dispatch(setError({status: "Error", message: "Data is not in expected format" }));
            }

        } catch (error) {
            console.error('Error ending workout:', error);
            dispatch(setError({status: error.status, message: error.message }));
        }
    };
};