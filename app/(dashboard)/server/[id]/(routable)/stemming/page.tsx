import StemmingHeader from "@/components/stemming/stemming_header";
import StemmingList from "@/components/stemming/stemming_list";

const StemmingPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const serverId = (await params).id;
  return (
    <div>
      <StemmingHeader />
      <StemmingList serverId={serverId} />
    </div>
  );
};

export default StemmingPage;
