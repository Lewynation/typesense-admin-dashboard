import SearchPresetsHeader from "@/components/search_presets/search_presets_header";
import SearchPresetsList from "@/components/search_presets/search_presets_list";

export const SearchPresetsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const serverId = (await params).id;

  return (
    <div>
      <SearchPresetsHeader />
      <SearchPresetsList serverId={serverId} />
    </div>
  );
};

export default SearchPresetsPage;
