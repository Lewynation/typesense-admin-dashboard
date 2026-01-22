import { useEffect, useState } from "react";
import { CollectionSchemaFieldManipulator } from "@/lib";
import { useCollection } from "@/swr/use_collection";
import { useServerAuthData } from "@/swr/use_server_auth_data";
import { useParams } from "next/navigation";

export const useQuery = (collectionName: string) => {
  // const {
  //   authData,
  //   isLoading: authLoading,
  //   error: authError,
  // } = useServerAuthData();
  const params = useParams<{ id: string; name: string }>();
  const { collection, error, isLoading } = useCollection(collectionName);
  const [typesenseSchemaManipulator, setTypesenseSchemaManipulator] =
    useState<CollectionSchemaFieldManipulator | null>(null);
  useEffect(() => {
    if (!collection || error) return;
    // if (authError) return;
    // if (!authData?.success) {
    //   return;
    // }
    const isClient = typeof window !== "undefined";
    if (!isClient) throw Error();
    const manipulator = new CollectionSchemaFieldManipulator(collection, {
      apiKey: params.id, // will be replaced in the proxy api route
      host: window.location.hostname,
      path: `/api/typesense/search/${params.id}`,
      port: window.location.port
        ? Number(window.location.port)
        : window.location.protocol === "https:"
          ? 443
          : 80,
      protocol: window.location.protocol.replace(":", "") as "http" | "https",
    });
    setTypesenseSchemaManipulator(manipulator);
  }, [collection, error]);
  return {
    typesenseSchemaManipulator,
    error,
    isLoading: isLoading,
  };
};
