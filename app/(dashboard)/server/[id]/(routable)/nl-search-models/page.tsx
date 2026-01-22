import NLSearchModelsHeader from "@/components/nl_search_models/nl_search_models_header";
import NLSearchModelsList from "@/components/nl_search_models/nl_search_models_list";

const NLSearchModelsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const serverId = (await params).id;
  return (
    <div>
      <NLSearchModelsHeader />
      <NLSearchModelsList serverId={serverId} />
    </div>
  );
};

export default NLSearchModelsPage;
