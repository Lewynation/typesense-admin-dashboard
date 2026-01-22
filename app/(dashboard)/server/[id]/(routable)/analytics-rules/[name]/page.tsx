import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const serverId = (await params).id;

  redirect(`/server/${serverId}/analytics-rules`);
};

export default Page;
