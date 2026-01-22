import { getAnalyticsRules } from "@/actions";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NoResourcesFound } from "../shared/no_resources_found";
import AnalyticsRulesRowActions from "./analytics_rules_row_actions";
import { AnalyticsRuleSchema } from "typesense/lib/Typesense/AnalyticsRule";
import { DocumentationLinks } from "@/config/documentaion_links";

const AnalyticsRulesList = async ({ serverId }: { serverId: string }) => {
  const analyticsRules = await getAnalyticsRules(serverId);
  if (!analyticsRules) {
    notFound();
  }
  return (
    <div className="my-4">
      {analyticsRules.rules && analyticsRules.rules.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">Rule Name</TableHead>
              <TableHead className="font-mono font-bold">Rule Type</TableHead>
              <TableHead className="font-mono font-bold">
                Destination Collection
              </TableHead>
              <TableHead className="font-mono font-bold">Limit</TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analyticsRules.rules.map((analyticsRule, index) => (
              <SingleAnalyticsRuleTile {...analyticsRule} key={index} />
            ))}
          </TableBody>
        </Table>
      )}
      {analyticsRules.rules.length <= 0 && (
        <>
          <NoResourcesFound
            resource="Analytics Rule"
            documentationLink={DocumentationLinks.analyticsRules}
          />
        </>
      )}
    </div>
  );
};

const SingleAnalyticsRuleTile = (analyticsRule: AnalyticsRuleSchema) => {
  return (
    <TableRow className="">
      <TableCell className="font-mono">
        <div className="font-mono font-bold">{analyticsRule.name}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{analyticsRule.type}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">
          {analyticsRule.params.destination?.collection}
        </div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{analyticsRule.params.limit}</div>
      </TableCell>
      <TableCell className="text-right">
        <AnalyticsRulesRowActions {...analyticsRule} />
      </TableCell>
    </TableRow>
  );
};

export default AnalyticsRulesList;
