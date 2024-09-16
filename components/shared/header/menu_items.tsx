"use client";

import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/actions";

const MenuItems = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
    </>
  );
};

export default MenuItems;
