import { getCollection } from "@/actions";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";

export const useCollection = (collectionName: string) => {
  const params = useParams<{ id: string }>();
  const {
    data: collection,
    error,
    isLoading,
  } = useSWR<CollectionSchema | undefined>(
    `/collections/${collectionName}`,
    async () => {
      const collection = await getCollection(params.id, collectionName);
      return collection;
    },
  );
  return {
    collection,
    error,
    isLoading,
  };
};
