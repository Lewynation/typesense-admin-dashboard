import { fetchServerById } from "@/actions";
import { GetTypesenseServerResponse } from "@/better_auth_plugins/typesense_plugin/typings";
import { useParams } from "next/navigation";
import useSWR from "swr";

export const useServerAuthData = () => {
  const params = useParams<{ id: string }>();
  const {
    data: authData,
    error,
    isLoading,
  } = useSWR<GetTypesenseServerResponse>(`/servers/${params.id}`, async () => {
    const collection = await fetchServerById(params.id);
    return collection;
  });
  return {
    authData,
    error,
    isLoading,
  };
};
