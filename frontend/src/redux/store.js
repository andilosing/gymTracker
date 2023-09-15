import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import authReducer from './slices/authSlice';
import workoutReducer from "./slices/workoutSlice";
import exerciseReducer from "./slices/exerciseSlice";
import setsReducer from "./slices/setsSlice";
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'workouts', 'exercises', 'sets'],  
};

const combinedReducer = combineReducers({
  auth: authReducer,
  workouts: workoutReducer,
  exercises: exerciseReducer,
  sets: setsReducer
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST']
    }
  }), thunk],
});

export const persistor = persistStore(store);
export default store;
