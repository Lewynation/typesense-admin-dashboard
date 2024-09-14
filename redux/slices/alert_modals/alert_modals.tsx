import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAlertModalSliceInitialState {
  searchAPIKeyResultDialog: boolean;
  searchApiKey: string;
  adminAPIKeyResultDialog: boolean;
  adminAPIKey: string;
}

const initialState: IAlertModalSliceInitialState = {
  searchAPIKeyResultDialog: false,
  searchApiKey: "",
  adminAPIKeyResultDialog: false,
  adminAPIKey: "",
};

const alertModalSlice = createSlice({
  name: "alertModalSlice",
  initialState,
  reducers: {
    changeSearchAPIKeyResultDialog: (state, action: PayloadAction<boolean>) => {
      state.searchAPIKeyResultDialog = action.payload;
    },
    setSearchApiKey: (state, action: PayloadAction<string>) => {
      state.searchApiKey = action.payload;
    },
    changeAdminApiKeyResultDialog: (state, action: PayloadAction<boolean>) => {
      state.adminAPIKeyResultDialog = action.payload;
    },
    setAdminApiKey: (state, action: PayloadAction<string>) => {
      state.adminAPIKey = action.payload;
    },
  },
});

export default alertModalSlice.reducer;

export const {
  changeSearchAPIKeyResultDialog,
  setSearchApiKey,
  setAdminApiKey,
  changeAdminApiKeyResultDialog,
} = alertModalSlice.actions;
