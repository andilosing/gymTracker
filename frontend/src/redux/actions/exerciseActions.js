import { setWorkoutExercisesHistory, setError, removeExercise } from '../slices/exerciseSlice';
import { baseQueryWithReauth } from '../../api/api';

export const fetchExercisesWorkoutHistory = () => {
  return async (dispatch, getState) => {
    try {
      const options = {
        method: 'GET',
      };

      const exercises = await baseQueryWithReauth(`/workouts/1/exercises/all`, options, dispatch, getState)
      console.log("abgerufende exercises: ", exercises)

      if (Array.isArray(exercises)) {
        dispatch(setWorkoutExercisesHistory(exercises));
      } else {
        dispatch(setError({ status: 'Error', message: 'Daten sind nicht im erwarteten Format' }));
      }
    } catch (error) {
      console.error('Fehler beim Abrufen von Übungen:', error);
      dispatch(setError({ status: error.status, message: error.message }));
    }
  };
};

export const deleteExerciseFromWorkout = (workoutId, exerciseId) => {
  return async (dispatch, getState) => {
    try {
      const options = {
        method: 'DELETE',
      };

      const response = await baseQueryWithReauth(`/workouts/${workoutId}/exercises/${exerciseId}`, options, dispatch, getState);
      console.log(response)

      if (response) {
        dispatch(removeExercise(response))
      } else {
        throw new Error('Fehler beim Löschen der Übung.');
      }
    } catch (error) {
      console.error('Fehler beim Löschen der Übung:', error);
      dispatch(setError({ status: error.status, message: error.message }));
    }
  };
};