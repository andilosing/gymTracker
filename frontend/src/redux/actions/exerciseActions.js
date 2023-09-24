import { fetchData, setWorkoutExercisesHistory, setError, removeExercise, setCustomExercises, setGlobalExercises } from '../slices/exerciseSlice';
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
        dispatch(fetchData(exercises));
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

export const fetchGlobalExercises = () => {
  return async (dispatch, getState) => {
      try {
          const options = {
              method: 'GET',
          };

          const globalExercises = await baseQueryWithReauth(`/global-exercise/list`, options, dispatch, getState);
          console.log("Abgerufene globale Übungen:", globalExercises);

          if (Array.isArray(globalExercises)) {
              dispatch(setGlobalExercises(globalExercises));
          } else {
              dispatch(setError({ status: 'Error', message: 'Daten sind nicht im erwarteten Format' }));
          }
      } catch (error) {
          console.error('Fehler beim Abrufen von globalen Übungen:', error);
          dispatch(setError({ status: error.status, message: error.message }));
      }
  };
};

export const fetchCustomExercises = () => {
  return async (dispatch, getState) => {
      try {
          const options = {
              method: 'GET',
          };

          const customExercises = await baseQueryWithReauth(`/custom-exercise/list`, options, dispatch, getState);
          console.log("Abgerufene benutzerdefinierte Übungen:", customExercises);

          if (Array.isArray(customExercises)) {
              dispatch(setCustomExercises(customExercises));
          } else {
              dispatch(setError({ status: 'Error', message: 'Daten sind nicht im erwarteten Format' }));
          }
      } catch (error) {
          console.error('Fehler beim Abrufen von benutzerdefinierten Übungen:', error);
          dispatch(setError({ status: error.status, message: error.message }));
      }
  };
};

export const addExerciseToWorkout = (workoutId, exerciseType, exerciseId) => {
  return async (dispatch, getState) => {
    try {
      let exerciseData = {};

      if (exerciseType === 'global') {
        exerciseData = {
          globalExerciseId: exerciseId
        };
      } else if (exerciseType === 'custom') {
        exerciseData = {
          customExerciseId: exerciseId
        };
      } else {
        throw new Error('Unbekannter Übungstyp.');
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exerciseData)
      };

      const response = await baseQueryWithReauth(`/workouts/${workoutId}/exercises/`, options, dispatch, getState);
      console.log("Hinzugefügte Übung:", response);
      console.log("Hinzugefügt exercise id: ", response.id)

      if (response && response.id) { 
        response.workout_exercise_id = response.id
        delete response.id

        dispatch(setWorkoutExercisesHistory(response));
        return response
      } else {
        console.log("response error: ? ", response)
        throw new Error('Fehler beim Hinzufügen der Übung zum Workout.');
      }
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Übung zum Workout:', error);
      dispatch(setError({ status: error.status || 'Error', message: error.message }));
    }
  };
};


