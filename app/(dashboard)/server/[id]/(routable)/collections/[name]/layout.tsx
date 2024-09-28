import { CollectionNestedNavElement } from "@/components/pages/dashboard/collections";
import { nestedCollectionNav } from "@/constants";
import Link from "next/link";
import React from "react";
import { Icons } from "@/components/ui";

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
        <Link href="/collections">
          <h3 className="text-2xl font-bold font-oswald">Collections</h3>
        </Link>
        <Icons.ChevronRight />
        <h3 className="text-2xl font-oswald">{params.name}</h3>
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
