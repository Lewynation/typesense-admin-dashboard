import { redirect } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  redirect(`/server/${params.id}/collections`);
};

export default Page;
