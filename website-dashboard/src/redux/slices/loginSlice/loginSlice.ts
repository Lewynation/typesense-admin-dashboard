/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import DEFAULTCREDS from "../../../constants/defaultCreds";

interface IInitialState {
  apiKey: string;
  protocol: string;
  host: string;
  port: number;
  path: string;
}

const initialState: IInitialState = {
  apiKey: DEFAULTCREDS.apiKey,
  protocol: DEFAULTCREDS.protocol,
  host: DEFAULTCREDS.host,
  port: DEFAULTCREDS.port,
  path: DEFAULTCREDS.path,
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
