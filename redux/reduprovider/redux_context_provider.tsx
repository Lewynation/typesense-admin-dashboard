"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

interface IReduxContextProviderProps {
  children: React.ReactNode;
}

const ReduxContextProvider: React.FC<IReduxContextProviderProps> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxContextProvider;
