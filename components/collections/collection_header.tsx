import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResourceReadmore from "../shared/resource_readmore";
import { DocumentationLinks } from "@/config/documentaion_links";

const CollectionHeader = () => {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono">Your Collections</CardTitle>
        <CardDescription className="font-mono text-balance max-w-lg leading-relaxed">
          A Collection is roughly equivalent to a table in a relational
          database.
          <ResourceReadmore link={DocumentationLinks.collections} />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link href="collections/create-collection" className="font-mono">
            Create New Collection
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CollectionHeader;
