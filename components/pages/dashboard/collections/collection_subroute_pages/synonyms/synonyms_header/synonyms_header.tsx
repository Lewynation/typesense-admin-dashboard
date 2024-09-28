import React from "react";
import { Icons, Button } from "@/components/ui";

const SynonymsHeader = () => {
  return (
    <div className="flex justify-between mt-2">
      <div></div>
      <Button className="">
        <div className="flex items-center">
          <Icons.Plus />
          <p className="font-oswald">Create Synonym</p>
        </div>
      </Button>
    </div>
  );
};

export default SynonymsHeader;
