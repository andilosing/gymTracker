import { createSlice } from '@reduxjs/toolkit';

const initialWorkoutsState = {
  workoutHistory: [],
  currentWorkout: null,
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


    startWorkout: (state, action) => {
      state.currentWorkout = {
        id: action.payload.id,         // setzt die ID des aktuellen Workouts
        startTime: action.payload.startTime  // setzt die Startzeit des aktuellen Workouts
      };
    },
    endWorkout: (state) => {
      state.currentWorkout = null;  // setzt das aktuelle Workout auf null
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null
    }
  }
});

export const { fetchData, setWorkoutHistory, setError, clearError, startWorkout, endWorkout, } = workoutsSlice.actions;
export default workoutsSlice.reducer;
