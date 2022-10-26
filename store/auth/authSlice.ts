import { LoginFromType } from './../../types/LoginFormType';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import type { AppState, AppThunk } from "../index";

export interface AuthState {
  access_token: any,
  user: any,
  loginScreen: LoginFromType,
  userEmail: string | null
}

const initialState: AuthState = {
  access_token: null,
  user: null,
  loginScreen: 'sign in',
  userEmail: null,
};

// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null;
      state.userEmail = null;
    },
    setAccessToken: (state, action: PayloadAction<AuthState['access_token']>) => {
      state.access_token = action.payload;
    },
    setLoginScreen: (state, action: PayloadAction<AuthState['loginScreen']>) => {
      state.loginScreen = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<AuthState['userEmail']>) => {
      state.userEmail = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
    },
  },
});

export const { setUser, logout, setAccessToken, setLoginScreen, setUserEmail } = authSlice.actions;

export default authSlice.reducer;
