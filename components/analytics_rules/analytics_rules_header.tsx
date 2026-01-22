"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import ResourceReadmore from "../shared/resource_readmore";
import { DocumentationLinks } from "@/config/documentaion_links";

const AnalyticsRulesHeader = () => {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono">Analytics Rules</CardTitle>
        <CardDescription className="font-mono text-balance max-w-lg leading-relaxed">
          Typesense can aggregate search queries for both analytics purposes and
          for query suggestions.
          <ResourceReadmore link={DocumentationLinks.analyticsRules} />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link
            href="analytics-rules/create-analytics-rule"
            className="font-mono"
          >
            Create An Analytics Rule
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnalyticsRulesHeader;
