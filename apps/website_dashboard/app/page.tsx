"use client";

import { useAuthenticated } from "@/hooks";
import {
  Avatar,
  Button,
  CircularSpinner,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "ui";

export default function Home() {
  const { authenticated, loading } = useAuthenticated();
  console.log(authenticated);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? (
        <CircularSpinner />
      ) : (
        <div className="font-extralight">
          <Sheet>
            <SheetTrigger asChild>
              <Button>Click Me</Button>
            </SheetTrigger>
            <SheetContent position="right" size="sm">
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you`&aposre
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <p className="text-primary">Something is going on</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4"></div>
              </div>
              <SheetFooter>
                <Button>Click Me</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Avatar />
          some content
        </div>
      )}
    </main>
  );
}
