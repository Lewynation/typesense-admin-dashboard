import ApiKeyHeaderSection from "@/components/api_keys/api_key_header_section";
import ApiKeysHomeSection from "@/components/api_keys/api_keys_home_section";

const ApiKeys = async ({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) => {
  const serverId = (await params).id;

  return (
    <>
      <div>
        <ApiKeyHeaderSection serverId={serverId} />
        <ApiKeysHomeSection serverId={serverId} />
      </div>
    </>
  );
};

export default ApiKeys;
