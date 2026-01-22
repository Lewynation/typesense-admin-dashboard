import { getConversationalModel } from "@/actions";
import { apiToLocalConversationalModel } from "@/lib/conversational_model_manipulator";
import { LocalConversationModel } from "@/zod/create_conversation_model";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { ConversationModelSchema } from "typesense/lib/Typesense/ConversationModel";

export const useConversationModel = (conversationModelId: string) => {
  const params = useParams<{ id: string; name: string }>();
  const {
    data: conversationModel,
    error,
    isLoading,
  } = useSWR<ConversationModelSchema | LocalConversationModel | undefined>(
    `/server/${params.id}/conversation-models/${conversationModelId}`,
    async (url: string) => {
      const details = await getConversationalModel(
        params.id,
        conversationModelId,
      );
      if (details) {
        return apiToLocalConversationalModel(details);
      }
    },
  );
  return {
    conversationModel,
    error,
    isLoading,
  };
};
