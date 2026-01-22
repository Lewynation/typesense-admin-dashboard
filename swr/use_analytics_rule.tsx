import { getAnalyticsRule } from "@/actions";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { AnalyticsRuleSchema } from "typesense/lib/Typesense/AnalyticsRule";

export const useAnalyticsRule = (analyticsRuleName: string) => {
  const params = useParams<{ id: string }>();
  const {
    data: analyticsRule,
    error,
    isLoading,
  } = useSWR<AnalyticsRuleSchema | undefined>(
    `/server/${params.id}/analytics-rules/${analyticsRuleName}`,
    async (url: string) => {
      const details = await getAnalyticsRule(params.id, analyticsRuleName);
      return details;
    }
  );
  return {
    analyticsRule,
    error,
    isLoading,
  };
};
