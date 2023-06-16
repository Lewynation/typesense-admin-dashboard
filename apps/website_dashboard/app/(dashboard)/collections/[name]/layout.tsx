import React from "react";

interface CollectionLayoutProps {
  children: React.ReactNode;
}

const CoolectionLayout: React.FC<CollectionLayoutProps> = ({ children }) => {
  return (
    <div>
      <p>Something</p>
      {children}
    </div>
  );
};

export default CoolectionLayout;
