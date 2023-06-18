import React from "react";
import {
  BarLoaderSpinner,
  Button,
  Icons,
  ShadCnButton,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "ui";

const ViweAPIKeyDetails = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <ShadCnButton.Button id="view_api_key_side_panel" className="hidden">
          Open view api key side sheet
        </ShadCnButton.Button>
      </SheetTrigger>
      <SheetContent position="right" size="lg">
        <SheetHeader>
          <SheetTitle className="font-oswald text-2xl">
            API Key details
          </SheetTitle>
        </SheetHeader>

        <div></div>
      </SheetContent>
    </Sheet>
  );
};

export default ViweAPIKeyDetails;
