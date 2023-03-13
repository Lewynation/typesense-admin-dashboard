import { useEffect, useState } from "react";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { useAppSelector } from "../../../../redux/store/store";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../../utils/typesenseActions";

const getSchema = async (
  collectionName: string,
  { apiKey, host, path, port, protocol }: ITypesenseAuthData
) => {
  const typesense = new TypesenseActions({
    apiKey,
    host,
    path,
    port,
    protocol,
  });
  const schema = await typesense.getCollectionSchema(collectionName);
  return schema;
};

const useSchema = (collectionName: string) => {
  const [schema, setSchema] = useState<CollectionSchema>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  useEffect(() => {
    setLoading(true);
    getSchema(collectionName, { apiKey, host, path, port, protocol })
      .then((response) => {
        setSchema(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [collectionName, apiKey, host, path, port, protocol]);

  return { schema, loading, error };
};

export default useSchema;
