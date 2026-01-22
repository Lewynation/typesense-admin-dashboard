import SearchApiKeysHome from "@/components/api_keys/search_only_api_keys/search_api_keys_home";

const SearchApiKey = async ({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) => {
  const serverId = (await params).id;

  return <SearchApiKeysHome serverId={serverId} />;
};

export default SearchApiKey;
