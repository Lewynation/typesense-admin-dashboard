import { CollectionNestedNavElement } from "@/components/pages/dashboard/collections";
import { nestedCollectionNav } from "@/constants";
import React from "react";
import { Icons } from "ui";

interface CollectionLayoutProps {
  children: React.ReactNode;
  params: { name: string };
}

const CoolectionLayout: React.FC<CollectionLayoutProps> = ({
  children,
  params,
}) => {
  return (
    <div>
      <div className="flex items-center gap-1 mb-2">
        <h3 className="font-oswald text-2xl">Collections</h3>
        <Icons.ChevronRight />
        <h3 className="font-oswald text-2xl">{params.name}</h3>
      </div>
      <div className="flex items-center gap-4">
        {nestedCollectionNav.map(({ href, title }, index) => (
          <CollectionNestedNavElement
            key={index}
            param={params.name}
            href={href}
            title={title}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

export default CoolectionLayout;
