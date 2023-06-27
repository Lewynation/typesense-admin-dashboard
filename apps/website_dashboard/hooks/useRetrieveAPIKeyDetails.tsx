import { useDependencies } from "@/contexts/dependency_provider";
import { useAppSelector } from "@/redux/store/store";
import { useEffect, useState } from "react";
import { TypesenseError } from "typesense/lib/Typesense/Errors";
import { KeySchema } from "typesense/lib/Typesense/Key";

export const useRetrieveAPIKeyDetails = () => {
  const [APIKeyDetails, setAPIKeyDetails] = useState<KeySchema | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TypesenseError | null>(null);
  const { keyId } = useAppSelector((state) => state.viewApiKeyDetailsSlice);
  const dependencies = useDependencies();

  useEffect(() => {
    if (keyId === null) return;
    setLoading(true);
    dependencies?.typesense
      ?.retrieveAPIKeyDetails(keyId)
      .then((response) => {
        setAPIKeyDetails(response);
      })
      .catch((err) => {
        setError(err as TypesenseError);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dependencies?.typesense, keyId]);

  return { APIKeyDetails, loading, error };
};
