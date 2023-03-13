import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/store/store";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../../utils/typesenseActions";
import getOutput from "../../../../utils/typesenseFields";

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

const useAddDocs = (collectionName: string) => {
  const [schema, setSchema] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  useEffect(() => {
    setLoading(true);
    getSchema(collectionName, { apiKey, host, path, port, protocol })
      .then((response) => {
        const docObject: any = {};
        response.fields?.forEach((field) => {
          docObject[field.name] = getOutput(field.type);
        });
        setSchema(docObject);
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

export default useAddDocs;
