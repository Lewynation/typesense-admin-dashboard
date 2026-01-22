import { getSynonym, retrieveApiKeyDetails } from "@/actions";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { SynonymSchema } from "typesense/lib/Typesense/Synonym";

export const useSynonym = (synonymId: string) => {
  const params = useParams<{ id: string; name: string }>();
  const {
    data: synonym,
    error,
    isLoading,
  } = useSWR<SynonymSchema | undefined>(
    `/server/${params.id}/collection/${params.name}/synonyms/${synonymId}`,
    async (url: string) => {
      const details = await getSynonym(params.id, synonymId, params.name);
      return details;
    }
  );
  return {
    synonym,
    error,
    isLoading,
  };
};
