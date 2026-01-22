import ConversationModelsHeader from "@/components/conversation_models/conversation_models_header";
import ConversationModelsList from "@/components/conversation_models/conversation_models_list";

const ConversationModelsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const serverId = (await params).id;

  return (
    <div>
      <ConversationModelsHeader />
      <ConversationModelsList serverId={serverId} />
    </div>
  );
};

export default ConversationModelsPage;
