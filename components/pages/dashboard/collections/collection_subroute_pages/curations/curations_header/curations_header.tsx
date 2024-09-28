import React from "react";
import { Icons, Button } from "@/components/ui";

const CurationsHeader = () => {
  return (
    <div className="mt-2 flex justify-between">
      <div></div>
      <Button className="">
        <div className="flex items-center">
          <Icons.Plus />
          <p className="font-oswald">Create curation</p>
        </div>
      </Button>
    </div>
  );
};

export default CurationsHeader;
