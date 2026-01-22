import { getAnalyticsRule } from "@/actions";
import { notFound } from "next/navigation";
import AnalyticsRuleCreateAssembly from "../analytics_rule_create/analytics_rule_create_assembly";

const AnalyticsRuleEditAssembly = async ({
  name,
  serverId,
}: {
  name: string;
  serverId: string;
}) => {
  const rule = await getAnalyticsRule(serverId, name);
  if (!rule) {
    notFound();
  }
  return <AnalyticsRuleCreateAssembly analyticsRule={rule} />;
};

export default AnalyticsRuleEditAssembly;
