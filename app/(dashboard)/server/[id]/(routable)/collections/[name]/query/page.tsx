import Query from "@/components/collections/query/query";

const CollectionQuery = async ({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) => {
  const serverId = (await params).id;
  const collectionName = (await params).name;

  return (
    <div>
      <Query schemaName={collectionName} />
    </div>
  );
};

export default CollectionQuery;
