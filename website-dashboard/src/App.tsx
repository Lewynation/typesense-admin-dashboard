import { Routes, Route } from "react-router-dom";
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
import PrivateRoutes from "./privateRoutes";
import BASEPATH from "./constants/baseURL";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
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
        </Route>
      </Route>
      <Route path={`${BASEPATH}/login`} element={<Login />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
