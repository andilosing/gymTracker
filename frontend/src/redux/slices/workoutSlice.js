import { createSlice } from '@reduxjs/toolkit';

const initialWorkoutsState = {
  workoutHistory: [],
  error: null
};

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: initialWorkoutsState,
  reducers: {
    fetchData: (state) => {
      // Hier würden Sie den tatsächlichen Fetch-Aufruf einfügen.
    },
    setWorkoutHistory: (state, action) => {
      state.workoutHistory = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null
    }
  }
});

export const { fetchData, setWorkoutHistory, setError, clearError } = workoutsSlice.actions;
export default workoutsSlice.reducer;
