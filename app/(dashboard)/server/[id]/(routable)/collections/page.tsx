import CollectionHeader from "@/components/collections/collection_header";
import CollectionMainHomeSection from "@/components/collections/collection_main_home_section";

const CollectionsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const serverId = (await params).id;
  return (
    <div>
      <CollectionHeader />
      <CollectionMainHomeSection serverId={serverId} />
    </div>
  );
};

export default CollectionsPage;
