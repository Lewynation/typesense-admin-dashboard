import { useEffect, useState } from "react";
import TypesenseActions from "../../../../utils/typesenseActions";
import getOutput from "../../../../utils/typesenseFields";

const getSchema = async (collectionName: string) => {
  const typesense = new TypesenseActions();
  const schema = await typesense.getCollectionSchema(collectionName);
  return schema;
};

const useAddDocs = (collectionName: string) => {
  const [schema, setSchema] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getSchema(collectionName)
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
  }, [collectionName]);

  return { schema, loading, error };
};

export default useAddDocs;
