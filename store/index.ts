import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

export function makeStore() {
  return configureStore({
    reducer: { auth: persistedReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;

export const wrapper = createWrapper<AppStore>(makeStore);
