import { createSlice } from '@reduxjs/toolkit';

const initialWorkoutsState = {
  workouts: [],
  error: null
};

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: initialWorkoutsState,
  reducers: {
    fetchData: (state) => {
      // Hier würden Sie den tatsächlichen Fetch-Aufruf einfügen.
    },
    setWorkouts: (state, action) => {
      state.workouts = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { fetchData, setWorkouts, setError } = workoutsSlice.actions;
export default workoutsSlice.reducer;
