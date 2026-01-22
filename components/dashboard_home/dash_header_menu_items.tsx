"use client";

import { authClient } from "@/auth/client";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MenuItems = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error("Error", {
          description: `${error.message || "Error logging out"}`,
          className: "font-mono",
        });
      }
      toast.success("Success", {
        description: `Logged out successfully`,
        className: "font-mono",
      });
    } catch (error) {
      toast.error("Error", {
        description: `Error logging out`,
        className: "font-mono",
      });
    } finally {
      router.replace("/login");
    }
  };

  return (
    <>
      <DropdownMenuItem className="font-mono" onClick={handleLogout}>
        Logout
      </DropdownMenuItem>
    </>
  );
};

export default MenuItems;
