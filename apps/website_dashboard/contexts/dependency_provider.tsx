"use client";

import { TypesenseActions } from "@/dependencies";
import React, { useContext, useState } from "react";

interface IDependencyContext {
  typesense: TypesenseActions | null;
  setTypesense: React.Dispatch<React.SetStateAction<TypesenseActions | null>>;
}

const DependencyContext = React.createContext<IDependencyContext | null>(null);

export const useDependencies = () => useContext(DependencyContext);

type DependencyProviderProps = {
  children: React.ReactNode;
};

export const DependencyProvider = ({ children }: DependencyProviderProps) => {
  const [typesense, setTypesense] = useState<TypesenseActions | null>(null);
  return (
    <DependencyContext.Provider value={{ typesense, setTypesense }}>
      {children}
    </DependencyContext.Provider>
  );
};
