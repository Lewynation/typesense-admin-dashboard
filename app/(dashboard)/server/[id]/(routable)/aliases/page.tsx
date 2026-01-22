import AliasesHeader from "@/components/aliases/aliases_header";
import AliasesList from "@/components/aliases/aliases_list";

const AlliasesPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const serverId = (await params).id;

  return (
    <div>
      <AliasesHeader />
      <AliasesList serverId={serverId} />
    </div>
  );
};

export default AlliasesPage;
