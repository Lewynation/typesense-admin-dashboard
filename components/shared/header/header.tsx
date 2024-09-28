import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import logo from "@/assets/images/logo.png";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import MenuItems from "./menu_items";

export const Header = () => {
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={logo.src} alt="The Ocluse" />
              <AvatarFallback>o_O</AvatarFallback>
            </Avatar>
            <span className="sr-only">The Ocluse</span>
          </Link>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full ml-auto"
              >
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <MenuItems />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};
