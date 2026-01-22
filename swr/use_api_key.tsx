import { retrieveApiKeyDetails } from "@/actions";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { KeySchema } from "typesense/lib/Typesense/Key";

export const useApiKey = (keyId: number) => {
  const params = useParams<{ id: string }>();
  const {
    data: apiKey,
    error,
    isLoading,
  } = useSWR<KeySchema | undefined>(
    `/api-key/${keyId}`,
    async (url: string) => {
      const details = await retrieveApiKeyDetails(params.id, keyId);
      return details;
    }
  );
  return {
    apiKey,
    error,
    isLoading,
  };
};
