import { useEffect, useState } from "react";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import TypesenseActions from "../../../../utils/typesenseActions";
import getOutput from "../../../../utils/typesenseFields";

const getSchema = async (collectionName: string) => {
  const typesense = new TypesenseActions();
  const schema = await typesense.getCollectionSchema(collectionName);
  return schema;
};

const useSchema = (collectionName: string) => {
  const [schema, setSchema] = useState<CollectionSchema>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getSchema(collectionName)
      .then((response) => {
        setSchema(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [collectionName]);

  return { schema, loading, error };
};

export default useSchema;
