/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  APIKeyDescription: string;
  collectionList: string[];
  required: boolean;
  expiryDate: number;
  collectionEmpty: boolean;
}

const initialState: IInitialState = {
  APIKeyDescription: "",
  collectionList: [],
  required: false,
  expiryDate: Date.now() + 604800000, // 7 days epoch time
  collectionEmpty: false,
};

const searchAPIKeyActionsSlice = createSlice({
  name: "searchAPIKeyActions",
  initialState,
  reducers: {
    storeAPIKeyDescription(state, action) {
      state.APIKeyDescription = action.payload;
    },
    storeCollections(state, action) {
      if (!state.collectionList.includes(action.payload)) {
        state.collectionList.push(action.payload);
      }
    },
    removeCollection(state, action) {
      if (state.collectionList.includes(action.payload)) {
        const index = state.collectionList.findIndex(
          (item) => item === action.payload
        );
        state.collectionList.splice(index, 1);
      }
    },
    storeExpiryDate(state, action) {
      state.expiryDate = action.payload;
    },
    setRequired(state, action) {
      state.required = action.payload;
    },
    setCollectionListEmpty(state, action) {
      state.collectionEmpty = action.payload;
    },
  },
});

export default searchAPIKeyActionsSlice.reducer;
export const {
  setRequired,
  storeAPIKeyDescription,
  storeCollections,
  storeExpiryDate,
  removeCollection,
  setCollectionListEmpty,
} = searchAPIKeyActionsSlice.actions;
