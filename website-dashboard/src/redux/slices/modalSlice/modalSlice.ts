import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openCurationModal: false,
  openSynonymModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCurationsModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.openCurationModal = !state.openCurationModal;
      return state;
    },
    openSynonymsModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.openSynonymModal = !state.openSynonymModal;
      return state;
    },
  },
});

export const { openCurationsModal, openSynonymsModal } = modalSlice.actions;
export default modalSlice.reducer;
