import { setSetsWorkoutHistory, setError, removeSet } from '../slices/setsSlice';
import { baseQueryWithReauth } from '../../api/api';

export const fetchSetsHistory= () => {
  return async (dispatch, getState) => {
    try {
      const options = {
        method: 'GET',
      };

      const sets = await baseQueryWithReauth(`/workouts/1/exercises/1/sets/all`, options, dispatch, getState);
      console.log("abgerufende sets: ", sets)

      if (Array.isArray(sets)) {
        dispatch(setSetsWorkoutHistory(sets));
      } else {
        dispatch(setError({ status: 'Error', message: 'Daten sind nicht im erwarteten Format' }));
      }
    } catch (error) {
      console.error('Fehler beim Abrufen von Sätzen für Übung:', error);
      dispatch(setError({ status: error.status, message: error.message }));
    }
  };
};

export const deleteSet = (workoutId, exerciseId, setId) => {
  return async (dispatch, getState) => {
    try {
      const options = {
        method: 'DELETE',
      };

      const response = await baseQueryWithReauth(`/workouts/${workoutId}/exercises/${exerciseId}/sets/${setId}`, options, dispatch, getState);

      if (response) {
        dispatch(removeSet(response))
      } else {
        throw new Error('Fehler beim Löschen des Sets.');
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Sets:', error);
      dispatch(setError({ status: error.status, message: error.message }));
    }
  };
};
