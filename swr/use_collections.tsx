import { getCollections } from "@/actions";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";

export const useCollections = () => {
  const params = useParams<{ id: string }>();
  const {
    data: collections,
    error,
    isLoading,
  } = useSWR<CollectionSchema[] | undefined>(`/collections`, async () => {
    const collections = await getCollections(params.id);
    return collections;
  });
  return {
    collections,
    error,
    isLoading,
  };
};
