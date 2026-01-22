import { getStopWord, getSynonym, retrieveApiKeyDetails } from "@/actions";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { StopwordSchema } from "typesense/lib/Typesense/Stopword";

export const useStopwords = (stopwordsId: string) => {
  const params = useParams<{ id: string }>();
  const {
    data: stopwords,
    error,
    isLoading,
  } = useSWR<StopwordSchema | undefined>(
    `/server/${params.id}/stop-words/${stopwordsId}`,
    async (url: string) => {
      const details = await getStopWord(params.id, stopwordsId);
      return details;
    }
  );
  return {
    stopwords,
    error,
    isLoading,
  };
};
