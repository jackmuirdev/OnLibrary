import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../slices/basketSlice";
import { catalogSlice } from "../slices/catalogSlice";
import { accountSlice } from "../slices/accountSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    catalog: catalogSlice.reducer,
    account: accountSlice.reducer,
    basket: basketSlice.reducer,
  }
})

export { configureStore };