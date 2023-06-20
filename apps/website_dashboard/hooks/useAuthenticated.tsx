"use client";

import { useDependencies } from "@/contexts/dependency_provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "use-local-storage";
import { LOCAL_STORAGE_KEY } from "@/constants";
import { TypesenseActions } from "@/dependencies";

export const useAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [credentials, setCredentials] = useLocalStorage(LOCAL_STORAGE_KEY, "");

  const router = useRouter();

  const dependencies = useDependencies();

  useEffect(() => {
    setLoading(true);
    if (dependencies?.typesense) {
      dependencies?.typesense
        ?.getHealth()
        .then((res) => {
          res.ok ? setAuthenticated(true) : router.replace("/login");
        })
        .catch((err) => {
          setError(err);
          router.replace("/login");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      if (credentials) {
        try {
          const creds = JSON.parse(credentials);
          if (creds) {
            dependencies?.setTypesense(new TypesenseActions(creds));
          } else {
            dependencies?.setTypesense(null);
            router.replace("/login");
          }
        } catch (error) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          dependencies?.setTypesense(null);
          router.replace("/login");
        }
      } else {
        router.replace("/login");
      }
    }
  }, [dependencies, router, credentials]);

  return { authenticated, loading, error };
};
