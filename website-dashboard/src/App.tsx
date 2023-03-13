import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import SearchAPIKeys from "./components/pages/apiKeys/searchAPIKeys/searchAPIKeys";
import Home from "./layouts/home/home";
import Aliases from "./pages/aliases/aliases";
import ApiKeys, { ApiKeysIndex } from "./pages/apiKeys/apiKeys";
import Index from "./pages/collections";
import AddDoc from "./pages/collections/addDoc/addDoc";
import Collections, { CollectionIndex } from "./pages/collections/collections";
import Curations from "./pages/collections/curations/curations";
import Query from "./pages/collections/query/query";
import Schema from "./pages/collections/schema/schema";
import Synonyms from "./pages/collections/synonyms/synonyms";
import Login from "./pages/login/login";
import ServerStats from "./pages/serverStats/serverStats";
import BASEPATH from "./constants/baseURL";
import { useAppDispatch, useAppSelector } from "./redux/store/store";
import { confirmHealth } from "./redux/slices/typesenseSlice/asyncThunks";
import STORAGEKEY from "./constants/localStorage";
import { ITypesenseAuthData } from "./utils/typesenseActions";
import { setAPILoginCredentials } from "./redux/slices/loginSlice/loginSlice";
import DEFAULTCREDS from "./constants/defaultCreds";

function App() {
  const dispatch = useAppDispatch();

  const { healthy } = useAppSelector((state) => state.typesense);
  const [credentials, setCredentials] = useLocalStorage(STORAGEKEY, "");
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  useEffect(() => {
    let creds: ITypesenseAuthData | null = null;
    if (credentials) {
      try {
        creds = JSON.parse(credentials);
      } catch (error) {
        localStorage.removeItem(STORAGEKEY);
        dispatch(setAPILoginCredentials(DEFAULTCREDS));
        dispatch(confirmHealth(DEFAULTCREDS));
      }
    }
    if (creds) {
      dispatch(setAPILoginCredentials(creds));
      dispatch(confirmHealth(creds)).unwrap();
    }
  }, [dispatch, apiKey, host, path, port, protocol, credentials]);

  return (
    <Routes>
      {healthy && (
        <Route path={`${BASEPATH}/`} element={<Home />}>
          <Route index element={<ServerStats />} />
          <Route path={`${BASEPATH}/collections`} element={<Collections />}>
            <Route index element={<CollectionIndex />} />
            <Route
              path={`${BASEPATH}/collections/:collectionName/`}
              element={<Index />}
            >
              <Route
                index
                path={`${BASEPATH}/collections/:collectionName/query`}
                element={<Query />}
              />
              <Route
                path={`${BASEPATH}/collections/:collectionName/schema`}
                element={<Schema />}
              />
              <Route
                path={`${BASEPATH}/collections/:collectionName/curations`}
                element={<Curations />}
              />
              <Route
                path={`${BASEPATH}/collections/:collectionName/add-doc`}
                element={<AddDoc />}
              />
              <Route
                path={`${BASEPATH}/collections/:collectionName/synonyms`}
                element={<Synonyms />}
              />
            </Route>
          </Route>
          <Route path={`${BASEPATH}/api-keys`} element={<ApiKeys />}>
            <Route index element={<ApiKeysIndex />} />
            <Route
              path={`${BASEPATH}/api-keys/search-api-key`}
              element={<SearchAPIKeys />}
            />
          </Route>
          <Route path={`${BASEPATH}/aliases`} element={<Aliases />} />
          <Route path="*" element={<Navigate to={`${BASEPATH}/`} />} />
        </Route>
      )}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
