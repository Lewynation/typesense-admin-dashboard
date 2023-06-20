import React from "react";
import { BarLoader } from "react-spinners";

export const BarLoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <BarLoader color="#3B82F6" width={80} />
    </div>
  );
};
