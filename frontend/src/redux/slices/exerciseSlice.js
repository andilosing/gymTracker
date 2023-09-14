import { createSlice } from '@reduxjs/toolkit';

const initialExercisesState = {
  exercises: [],
  error: null
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: initialExercisesState,
  reducers: {
    fetchData: (state) => {
      // Hier würden Sie den tatsächlichen Fetch-Aufruf einfügen.
    },
    setExercises: (state, action) => {
      state.exercises = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { fetchData, setExercises, setError } = exercisesSlice.actions;
export default exercisesSlice.reducer;
