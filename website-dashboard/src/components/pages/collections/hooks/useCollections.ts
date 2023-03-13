import { useEffect, useState } from "react";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { useAppSelector } from "../../../../redux/store/store";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../../utils/typesenseActions";

const fetchCollections = async ({
  apiKey,
  host,
  path,
  port,
  protocol,
}: ITypesenseAuthData) => {
  const typesense = new TypesenseActions({
    apiKey,
    host,
    path,
    port,
    protocol,
  });
  const curations = await typesense.getCollections();
  return curations;
};

const useFetchCollections = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState<CollectionSchema[]>([]);
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  useEffect(() => {
    setLoading(true);
    fetchCollections({ apiKey, host, path, port, protocol })
      .then((response) => {
        setCollections(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiKey, host, path, port, protocol]);

  return { collections, loading, error };
};

export default useFetchCollections;
