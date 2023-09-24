import { setSetsWorkoutHistory, fetchData, setError, removeSet } from '../slices/setsSlice';
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
        dispatch(fetchData(sets));
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

export const addSetToExerciseInWorkout = (workoutId, exerciseId, reps, weight, set_number) => {
  return async (dispatch, getState) => {
    try {
      const setData = {
        reps,
        weight,
        set_number
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setData)
      };

      const response = await baseQueryWithReauth(`/workouts/${workoutId}/exercises/${exerciseId}/sets`, options, dispatch, getState);
      console.log("Hinzugefügtes Set:", response);

      if (response && response.id) {
        // Ändern Sie hier die response.id in set_id
        response.set_id = response.id;
        delete response.id;

        dispatch(setSetsWorkoutHistory(response));
      } else {
        throw new Error('Fehler beim Hinzufügen des Sets zur Übung im Workout.');
      }
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Sets zur Übung im Workout:', error);
      dispatch(setError({ status: error.status || 'Error', message: error.message }));
    }
  };
};

