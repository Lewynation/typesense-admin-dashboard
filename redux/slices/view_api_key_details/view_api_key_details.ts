import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  keyId: number | null;
  openSideMenu: boolean;
}

const initialState: IInitialState = {
  keyId: null,
  openSideMenu: false,
};

const viewApiKeyDetailsSlice = createSlice({
  name: "viewApiKeyDetails",
  initialState,
  reducers: {
    setKeyId: (state, action: PayloadAction<number>) => {
      state.keyId = action.payload;
    },
    setOpenSideMenu: (state, action: PayloadAction<boolean>) => {
      state.openSideMenu = action.payload;
    },
  },
});

export default viewApiKeyDetailsSlice.reducer;
export const { setKeyId, setOpenSideMenu } = viewApiKeyDetailsSlice.actions;
