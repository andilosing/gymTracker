import { createSlice } from '@reduxjs/toolkit';

const initialExercisesState = {
  workoutExercisesHistory: [],
  error: null
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: initialExercisesState,
  reducers: {
    fetchData: (state) => {
      // Hier würden Sie den tatsächlichen Fetch-Aufruf einfügen.
    },
    setWorkoutExercisesHistory: (state, action) => {
      state.workoutExercisesHistory = action.payload;
    },
    removeExercise: (state, action) => {
      state.workoutExercisesHistory = state.workoutExercisesHistory.filter(exercise => exercise.workout_exercise_id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null
    }
  }
});

export const { fetchData, setWorkoutExercisesHistory, setError, clearError, removeExercise } = exercisesSlice.actions;
export default exercisesSlice.reducer;
