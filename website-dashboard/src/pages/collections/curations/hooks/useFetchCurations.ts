import { useEffect, useState } from "react";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import TypesenseActions from "../../../../utils/typesenseActions";

const fetchCurations = async (collectionName: string) => {
  const typesense = new TypesenseActions();
  const curations = await typesense.getCurations(collectionName);
  return curations;
};

const useFetchCurations = (collectionName: string) => {
  const [curations, setCurations] = useState<OverrideSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    fetchCurations(collectionName)
      .then((response) => {
        setCurations(response.overrides);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [collectionName]);

  return { curations, loading, error };
};

export default useFetchCurations;
