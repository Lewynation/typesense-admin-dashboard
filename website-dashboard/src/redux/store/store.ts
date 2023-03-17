import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import typesenseSlice from "../slices/typesenseSlice/typesenseSlice";
import modalSlice from "../slices/modalSlice/modalSlice";
import searchCheckBoxes from "../slices/searchCheckBoxes/searchCheckBoxes";
import searchAPIKeyActionsSlice from "../slices/searchAPIKeyActions/serachAPIKeyActions";
import loginSlice from "../slices/loginSlice/loginSlice";
import themeSlice from "../slices/theme/themeSlice";
import deletions from "../slices/deletions/deletionsSlice";
import storeFetchedDataSlice from "../slices/tempStoreFetchedData/storeFetchedDataSlice";

export const store = configureStore({
  reducer: {
    typesense: typesenseSlice,
    modal: modalSlice,
    searchCheckBoxes,
    searchAPIKeyActionsSlice,
    login: loginSlice,
    theme: themeSlice,
    deletions,
    tempFetchedDataStore: storeFetchedDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
