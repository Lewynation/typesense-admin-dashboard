import { useEffect, useState } from "react";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import TypesenseActions from "../../../../utils/typesenseActions";

const fetchCollections = async () => {
  const typesense = new TypesenseActions();
  const curations = await typesense.getCollections();
  return curations;
};

const useFetchCollections = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState<CollectionSchema[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchCollections()
      .then((response) => {
        setCollections(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { collections, loading, error };
};

export default useFetchCollections;
