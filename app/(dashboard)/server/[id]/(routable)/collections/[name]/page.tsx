import { redirect } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) => {
  const serverId = (await params).id;
  const collectionName = (await params).name;

  redirect(`/server/${serverId}/collections/${collectionName}/query`);
};

export default Page;
