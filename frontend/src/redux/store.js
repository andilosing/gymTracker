import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import  workoutReducer from "./slices/workoutSlice"
import exerciseReducer from "./slices/exerciseSlice"
import setsReducer from "./slices/setsSlice"
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutReducer,
    exercises: exerciseReducer,
    sets: setsReducer
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

export default store;