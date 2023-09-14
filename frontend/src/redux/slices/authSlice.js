import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    registerSuccess: (state, action) => {
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
    resendEmailSuccess: (state) => {
      state.resendEmailStatus = "success";
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
});

export const { loginSuccess, registerSuccess, setCredentials, logout, resendEmailSuccess, setError, clearError } = authSlice.actions;
export default authSlice.reducer;