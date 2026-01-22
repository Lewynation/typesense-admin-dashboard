import AnalyticsRuleEditAssembly from "@/components/analytics_rule_edit/analytics_rule_edit_assembly";

const EditAnalyticsRule = async ({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) => {
  const serverId = (await params).id;
  const name = (await params).name;
  return (
    <div>
      <AnalyticsRuleEditAssembly name={name} serverId={serverId} />
    </div>
  );
};

export default EditAnalyticsRule;
