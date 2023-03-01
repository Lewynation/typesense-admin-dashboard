import { configureStore } from "@reduxjs/toolkit";
import typesenseSlice from "../slices/typesenseSlice/typesenseSlice";
import modalSlice from "../slices/modalSlice/modalSlice";

export const store = configureStore({
  reducer: {
    typesense: typesenseSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
