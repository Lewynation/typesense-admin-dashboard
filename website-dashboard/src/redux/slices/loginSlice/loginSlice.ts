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
    setAPILoginCredentials: (state, { payload }) => {
      const { apiKey, protocol, host, port, path } = payload;
      state.apiKey = apiKey;
      state.protocol = protocol;
      state.host = host;
      state.port = port;
      state.path = path;
    },
  },
});

export default loginSlice.reducer;
export const { setAPILoginCredentials } = loginSlice.actions;
