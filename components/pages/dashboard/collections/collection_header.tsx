import Link from "next/link";
import React from "react";
import { Icons, Button } from "@/components/ui";

const CollectionHeader = () => {
  return (
    <div className="flex justify-between mt-2">
      <div></div>
      <Link href="collections/create-collection">
        <Button className="">
          <div className="flex items-center">
            <Icons.Plus />
            <p className="font-oswald">Create Collection</p>
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default CollectionHeader;
