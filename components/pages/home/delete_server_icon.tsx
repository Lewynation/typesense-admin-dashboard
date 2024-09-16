"use client";
import { deleteServerById } from "@/actions";
import { BarLoaderFullScreenWidth, Button } from "@/components/ui";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "@/hooks";
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
} from "@/components/ui";

interface DeleteServerIconProps {
  id: string;
}
const DeleteServerIcon: React.FC<DeleteServerIconProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleServerDelete = async () => {
    try {
      setLoading(true);
      await deleteServerById(id);
    } catch (error) {
      toast({
        title: "Error",
        content: "Error deleting server",
        variant: "destructive",
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
              <Trash className="h-5 w-5" />
              <span className="sr-only">Delete</span>
            </div>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-oswald">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-oswald">
              This action cannot be undone. This will permanently delete this
              typesense server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-oswald">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="font-oswald"
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
