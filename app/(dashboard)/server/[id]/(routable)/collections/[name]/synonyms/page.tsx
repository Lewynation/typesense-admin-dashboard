import SynonymList from "@/components/collections/synonyms/synonym_list";
import SynonymsHeader from "@/components/collections/synonyms/synonyms_header";

const SynonymsPage = async ({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) => {
  const serverId = (await params).id;
  const collectionName = (await params).name;

  return (
    <div>
      <SynonymsHeader />
      <SynonymList serverId={serverId} collectionName={collectionName} />
    </div>
  );
};

export default SynonymsPage;
