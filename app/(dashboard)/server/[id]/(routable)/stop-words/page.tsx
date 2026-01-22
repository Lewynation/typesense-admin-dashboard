import StopWordsHeader from "@/components/stop_words/stop_words_header";
import StopWordsList from "@/components/stop_words/stop_words_list";

const StopWordsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const serverId = (await params).id;
  return (
    <div>
      <StopWordsHeader />
      <StopWordsList serverId={serverId} />
    </div>
  );
};

export default StopWordsPage;
