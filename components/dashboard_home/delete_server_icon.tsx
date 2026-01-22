"use client";
import { deleteServerById } from "@/actions";
import { BarLoaderFullScreenWidth } from "@/components/ui/bar_loader";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteServerIconProps {
  id: string;
}
const DeleteServerIcon: React.FC<DeleteServerIconProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const handleServerDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteServerById(id);
      if (!res.success) {
        return toast.error("Error", {
          description: res.error,
          className: "font-mono",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "Error deleting server",
        className: "font-mono",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <BarLoaderFullScreenWidth loading={loading} />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
            onClick={() => {}}
          >
            <div>
              <Trash className="h-5 w-5 text-destructive" />
              <span className="sr-only">Delete</span>
            </div>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-mono">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-mono">
              This action cannot be undone. This will permanently delete this
              typesense server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-mono">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="font-mono"
              onClick={async () => {
                await handleServerDelete();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteServerIcon;
