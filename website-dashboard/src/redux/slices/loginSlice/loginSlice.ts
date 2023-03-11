/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  apiKey: string;
  protocol: string;
  host: string;
  port: number;
  path: string;
}

const initialState: IInitialState = {
  apiKey: "",
  protocol: "http",
  host: "",
  port: 8108,
  path: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
    setProtocol: (state, action) => {
      state.protocol = action.payload;
    },
    setHost: (state, action) => {
      state.host = action.payload;
    },
    setPort: (state, action) => {
      state.port = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { setApiKey, setHost, setPath, setPort, setProtocol } =
  loginSlice.actions;
