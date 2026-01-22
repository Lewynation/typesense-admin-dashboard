import CollectionNestedNavElement from "@/components/collections/collection_nested_nav_element";
import React from "react";

const nestedCollectionNav = [
  {
    title: "Query",
    href: "query",
  },
  {
    title: "Schema",
    href: "schema",
  },
  {
    title: "Curations",
    href: "curations",
  },
  {
    title: "Add doc",
    href: "add-doc",
  },
  {
    title: "Synonyms",
    href: "synonyms",
  },
];

const CoolectionLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string; name: string }>;
}) => {
  const collectionName = (await params).name;

  return (
    <div>
      <div className="flex items-center gap-6">
        {nestedCollectionNav.map(({ href, title }, index) => (
          <CollectionNestedNavElement
            key={index}
            param={collectionName}
            href={href}
            title={title}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-4 pt-6">{children}</div>
    </div>
  );
};

export default CoolectionLayout;
