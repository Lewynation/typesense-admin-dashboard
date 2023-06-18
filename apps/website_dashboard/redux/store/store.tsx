import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import searchCheckBoxes from "@/redux/slices/search_check_boxes/search_check_boxes";
import searchAPIKeyActionsSlice from "@/redux/slices/search_api_key_acctions/search_api_key_actions";
import alertModalSlice from "@/redux/slices/alert_modals/alert_modals";

export const store = configureStore({
  reducer: {
    searchCheckBoxes,
    searchAPIKeyActionsSlice,
    alertModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
