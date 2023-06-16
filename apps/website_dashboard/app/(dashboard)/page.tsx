import { AuthenticationCheckWrapper } from "@/components/shared";
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
  return (
    // <div className="">
    //   {loading ? (
    //     <CircularSpinner />
    //   ) : (
    //     <div className="font-extralight">
    //       Heeeeey
    //       {/* <div className="fixed left-0 w-full h-24 bg-green-500">Hello</div>
    //       <div className="fixed left-0 h-full mt-24 bg-black w-72">Hello</div> */}
    //       {/* <Sheet>
    //         <SheetTrigger asChild>
    //           <Button>Click Me</Button>
    //         </SheetTrigger>
    //         <SheetContent position="right" size="sm">
    //           <SheetHeader>
    //             <SheetTitle>Edit profile</SheetTitle>
    //             <SheetDescription>
    //               Make changes to your profile here. Click save when you`&aposre
    //               done.
    //             </SheetDescription>
    //           </SheetHeader>
    //           <div className="grid gap-4 py-4">
    //             <div className="grid items-center grid-cols-4 gap-4">
    //               <p className="text-primary">Something is going on</p>
    //             </div>
    //             <div className="grid items-center grid-cols-4 gap-4"></div>
    //           </div>
    //           <SheetFooter>
    //             <Button>Click Me</Button>
    //           </SheetFooter>
    //         </SheetContent>
    //       </Sheet> */}
    //       {/* <Avatar /> */}
    //     </div>
    //   )}
    // </div>
    <AuthenticationCheckWrapper>
      <div>Hello</div>
    </AuthenticationCheckWrapper>
  );
}
