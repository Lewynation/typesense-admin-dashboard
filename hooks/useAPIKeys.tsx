import { useDependencies } from "@/contexts/dependency_provider";
import useSWR from "swr";
import { TypesenseError } from "typesense/lib/Typesense/Errors";

export const useAPIKeys = () => {
  const dependencies = useDependencies();
  const { data, error, isLoading } = useSWR("/api-keys", async () => {
    return dependencies?.typesense
      ?.getAPIKeys()
      .then((response) => response.keys);
  });
  return { apiKeys: data, loading: isLoading, error: error as TypesenseError };
};
