import { createSlice } from '@reduxjs/toolkit';

const initialSetsState = {
  setsWorkoutHistory: [],
  error: null
};

const setsSlice = createSlice({
  name: 'sets',
  initialState: initialSetsState,
  reducers: {
    fetchData: (state) => {
      // Hier würden Sie den tatsächlichen Fetch-Aufruf einfügen.
    },
    setSetsWorkoutHistory: (state, action) => {
      state.setsWorkoutHistory = action.payload;
    },
    removeSet: (state, action) => {
      state.setsWorkoutHistory = state.setsWorkoutHistory.filter(set => set.set_id !== action.payload);
    },    
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null
    }
  }
});

export const { fetchData, setSetsWorkoutHistory, setError, clearError, removeSet } = setsSlice.actions;
export default setsSlice.reducer;
