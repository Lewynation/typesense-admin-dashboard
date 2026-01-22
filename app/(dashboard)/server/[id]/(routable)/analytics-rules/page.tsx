import AnalyticsRulesHeader from "@/components/analytics_rules/analytics_rules_header";
import AnalyticsRulesList from "@/components/analytics_rules/analytics_rules_list";

const AnalyticsRulesPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const serverId = (await params).id;

  return (
    <div>
      <AnalyticsRulesHeader />
      <AnalyticsRulesList serverId={serverId} />
    </div>
  );
};

export default AnalyticsRulesPage;
