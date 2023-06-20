"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "ui";

interface TableActionNavigationProps {
  baseUrl: string;
  dynamicUrlSection: string;
}

const TableActionNavigation: React.FC<TableActionNavigationProps> = ({
  baseUrl,
  dynamicUrlSection,
}) => {
  const router = useRouter();
  const url = `${baseUrl}/${dynamicUrlSection}`;

  return (
    <DropdownMenuItem
      onClick={() => {
        router.push(url);
      }}
    >
      <p className="font-oswald"> View Collection</p>
    </DropdownMenuItem>
  );
};

export default TableActionNavigation;
