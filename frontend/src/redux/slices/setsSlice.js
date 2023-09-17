import { createSlice } from '@reduxjs/toolkit';

const initialSetsState = {
  setsWorkoutHistory: [],
  currentWorkoutSets: [],
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

    addSetToCurrentWorkout: (state, action) => {
      state.currentWorkoutSets.push(action.payload);
    },
    removeSetFromCurrentWorkout: (state, action) => {
        state.currentWorkoutSets = state.currentWorkoutSets.filter(set => set.id !== action.payload);
    },
    decrementSetNumber: (state, action) => {
      const setToDecrement = state.currentWorkoutSets.find(set => set.id === action.payload);
      if (setToDecrement) {
        setToDecrement.set_number -= 1;
      }
    },



    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null
    }
  }
});

export const { fetchData, setSetsWorkoutHistory, setError, clearError, removeSet, addSetToCurrentWorkout, removeSetFromCurrentWorkout, decrementSetNumber } = setsSlice.actions;
export default setsSlice.reducer;
