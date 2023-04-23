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
    if (dependencies?.typesense) {
      dependencies?.typesense
        ?.getHealth()
        .then((res) => {
          console.log("trying to authenticate");
          res.ok ? setAuthenticated(true) : router.replace("/login");
        })
        .catch((err) => {
          router.replace("/login");
          setError(err);
        })
        .finally(() => {
          setLoading(false);
          console.log("finally");
        });
    } else {
      if (credentials) {
        try {
          const creds = JSON.parse(credentials);
          if (creds) {
            dependencies?.setTypesense(new TypesenseActions(creds));
          } else {
            console.log("no creds");
            dependencies?.setTypesense(null);
            router.replace("/login");
          }
        } catch (error) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          dependencies?.setTypesense(null);
        }
      } else {
        router.replace("/login");
        console.log("no creds");
      }
    }
  }, [dependencies, router, credentials]);

  return { authenticated, loading, error };
};
