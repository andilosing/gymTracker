import { createSlice } from '@reduxjs/toolkit';

const initialSetsState = {
  sets: [],
  error: null
};

const setsSlice = createSlice({
  name: 'sets',
  initialState: initialSetsState,
  reducers: {
    fetchData: (state) => {
      // Hier würden Sie den tatsächlichen Fetch-Aufruf einfügen.
    },
    setSets: (state, action) => {
      state.sets = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { fetchData, setSets, setError } = setsSlice.actions;
export default setsSlice.reducer;
