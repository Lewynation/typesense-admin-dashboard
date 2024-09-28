"use client";
import React from "react";
import { BarLoader } from "react-spinners";

interface BarLoaderFullScreenWidthPRops {
  loading: boolean;
}

export const BarLoaderFullScreenWidth: React.FC<
  BarLoaderFullScreenWidthPRops
> = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-1">
          <BarLoader
            color="#3B82F6"
            className="z-50 w-full h-full"
            width="100%"
          />
        </div>
      )}
    </>
  );
};
