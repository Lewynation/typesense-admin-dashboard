/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openCurationModal: false,
  openSynonymModal: false,
  openAdminAPIKeyModal: false,
  openAliasesModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCurationsModal: (state) => {
      state.openCurationModal = !state.openCurationModal;
      return state;
    },
    openSynonymsModal: (state) => {
      state.openSynonymModal = !state.openSynonymModal;
      return state;
    },
    openAdminAPIKeyModal: (state) => {
      state.openAdminAPIKeyModal = !state.openAdminAPIKeyModal;
      return state;
    },
    openAliasesModal: (state) => {
      state.openAliasesModal = !state.openAliasesModal;
      return state;
    },
  },
});

export const {
  openCurationsModal,
  openSynonymsModal,
  openAdminAPIKeyModal,
  openAliasesModal,
} = modalSlice.actions;
export default modalSlice.reducer;
