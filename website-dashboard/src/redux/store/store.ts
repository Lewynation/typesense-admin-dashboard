import { configureStore } from "@reduxjs/toolkit";
import typesenseSlice from "../slices/typesenseSlice/typesenseSlice";

export const store = configureStore({
  reducer: {
    typesense: typesenseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
