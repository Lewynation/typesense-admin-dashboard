import { useDependencies } from "@/contexts/dependency_provider";
import useSWR from "swr";
import { TypesenseError } from "typesense/lib/Typesense/Errors";

export const useAliases = () => {
  const dependencies = useDependencies();

  const { data, error, isLoading } = useSWR("/aliases", async () => {
    return dependencies?.typesense
      ?.getAliases()
      .then((response) => response.aliases);
  });

  return { aliases: data, loading: isLoading, error: error as TypesenseError };
};
