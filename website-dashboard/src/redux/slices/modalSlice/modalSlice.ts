import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openCurationModal: false,
  openSynonymModal: false,
  openAdminAPIKeyModal: false,
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
    openAdminAPIKeyModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.openAdminAPIKeyModal = !state.openAdminAPIKeyModal;
      return state;
    },
  },
});

export const { openCurationsModal, openSynonymsModal, openAdminAPIKeyModal } =
  modalSlice.actions;
export default modalSlice.reducer;
