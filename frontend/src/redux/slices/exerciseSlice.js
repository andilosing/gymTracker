import { createSlice } from '@reduxjs/toolkit';

const initialExercisesState = {
  workoutExercisesHistory: [],
  currentWorkoutExercises: [],
  globalExercisesList: [],
  customExercisesList: [],
  error: null
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: initialExercisesState,
  reducers: {
    fetchData: (state, action) => {
      state.workoutExercisesHistory =  action.payload;
    },
    setWorkoutExercisesHistory: (state, action) => {
      state.workoutExercisesHistory = [...state.workoutExercisesHistory, action.payload];
  },
    removeExercise: (state, action) => {
      state.workoutExercisesHistory = state.workoutExercisesHistory.filter(exercise => exercise.workout_exercise_id !== action.payload);
    },
    resetCurrentWorkoutExercises: (state) => {
      state.currentWorkoutExercises = [];
    },


    addExerciseToCurrentWorkout: (state, action) => {
        state.currentWorkoutExercises.push(action.payload);
    },
    removeExerciseFromCurrentWorkout: (state, action) => {
        state.currentWorkoutExercises = state.currentWorkoutExercises.filter(exercise => exercise.id !== action.payload);
    },
    clearCurrentExercises: (state) => {
        state.currentWorkoutExercises = [];
    },

    setGlobalExercises: (state, action) => {
      state.globalExercisesList = action.payload;
      console.log("state global exercises: ", state.globalExercisesList)
    },
    setCustomExercises: (state, action) => {
        state.customExercisesList = action.payload;
        console.log("state custom exercises: ", state.customExercisesList)
    },


    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null
    }
  }
});

export const { fetchData, setWorkoutExercisesHistory, resetCurrentWorkoutExercises, setError, clearError, removeExercise, setCustomExercises, setGlobalExercises, addExerciseToCurrentWorkout, removeExerciseFromCurrentWorkout } = exercisesSlice.actions;
export default exercisesSlice.reducer;
