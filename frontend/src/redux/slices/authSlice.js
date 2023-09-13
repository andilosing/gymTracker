import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    registerSuccess: (state, action) => {
      state.isAuthenticated = false; 
      state.token = null;
      state.user = action.payload.user;
    },
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, registerSuccess, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;