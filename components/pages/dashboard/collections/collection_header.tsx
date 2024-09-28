import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CollectionHeader = () => {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Your Collections</CardTitle>
        <CardDescription className="text-balance max-w-lg leading-relaxed">
          A Collection is roughly equivalent to a table in a relational
          database.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link href="collections/create-collection">
            Create New Collection
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CollectionHeader;
