import { getConversationalModel, getNLSearchModel } from "@/actions";
import { apiToLocalConversationalModel } from "@/lib/conversational_model_manipulator";
import { apiToLocalNLSearchModel } from "@/lib/nl_search_model_manipulator";
import { LocalConversationModel } from "@/zod/create_conversation_model";
import { LocalNLSearchModel } from "@/zod/create_nl_search_model";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { ConversationModelSchema } from "typesense/lib/Typesense/ConversationModel";
import { NLSearchModelSchema } from "typesense/lib/Typesense/NLSearchModels";

export const useNLSearchModel = (nlSearchModelId: string) => {
  const params = useParams<{ id: string; name: string }>();
  const {
    data: nlSearchModel,
    error,
    isLoading,
  } = useSWR<LocalNLSearchModel | NLSearchModelSchema | undefined>(
    `/server/${params.id}/nl-search-models/${nlSearchModelId}`,
    async (url: string) => {
      const details = await getNLSearchModel(params.id, nlSearchModelId);
      if (details) {
        return apiToLocalNLSearchModel(details);
      }
    },
  );
  return {
    nlSearchModel,
    error,
    isLoading,
  };
};
