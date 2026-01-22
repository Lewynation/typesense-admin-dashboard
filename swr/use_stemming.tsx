import { getStemmingDictionary } from "@/actions";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { StemmingDictionarySchema } from "typesense/lib/Typesense/StemmingDictionary";

export const useStemming = (stemmingId?: string) => {
  const params = useParams<{ id: string }>();
  const {
    data: stemmingDictionary,
    error,
    isLoading,
  } = useSWR<StemmingDictionarySchema | undefined>(
    `/server/${params.id}/stemming/${stemmingId}`,
    async (url: string) => {
      if (stemmingId) {
        const details = await getStemmingDictionary(params.id, stemmingId);
        return details;
      }
      return undefined;
    },
  );
  return {
    stemmingDictionary,
    error,
    isLoading,
  };
};
