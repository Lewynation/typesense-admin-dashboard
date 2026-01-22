import CurationsHeader from "@/components/collections/curations/curations_header";
import CurationsList from "@/components/collections/curations/curations_list";
import React from "react";

const CurationsPage = async ({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) => {
  const serverId = (await params).id;
  const collectionName = (await params).name;

  return (
    <div>
      <CurationsHeader />
      <CurationsList collectionName={collectionName} serverId={serverId} />
    </div>
  );
};

export default CurationsPage;
