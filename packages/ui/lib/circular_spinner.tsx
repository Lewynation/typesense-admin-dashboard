import React from "react";
import { HashLoader, MoonLoader } from "react-spinners";

export const CircularSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <MoonLoader size={30} />
    </div>
  );
};
