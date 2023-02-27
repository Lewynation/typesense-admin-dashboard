import { Routes, Route } from "react-router-dom";
import Home from "./layouts/home/home";
import Aliases from "./pages/aliases/aliases";
import ApiKeys from "./pages/apiKeys/apiKeys";
import Index from "./pages/collections";
import AddDoc from "./pages/collections/addDoc/addDoc";
import Collections, { CollectionIndex } from "./pages/collections/collections";
import Curations from "./pages/collections/curations/curations";
import Query from "./pages/collections/query/query";
import Schema from "./pages/collections/schema/schema";
import Synonyms from "./pages/collections/synonyms/synonyms";
import ServerStats from "./pages/serverStats/serverStats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<ServerStats />} />
        <Route path="/collections" element={<Collections />}>
          <Route index element={<CollectionIndex />} />
          <Route path="/collections/:collectionName/" element={<Index />}>
            <Route
              index
              path="/collections/:collectionName/query"
              element={<Query />}
            />
            <Route
              path="/collections/:collectionName/schema"
              element={<Schema />}
            />
            <Route
              path="/collections/:collectionName/curations"
              element={<Curations />}
            />
            <Route
              path="/collections/:collectionName/add-doc"
              element={<AddDoc />}
            />
            <Route
              path="/collections/:collectionName/synonyms"
              element={<Synonyms />}
            />
          </Route>
        </Route>
        <Route path="/api-keys" element={<ApiKeys />} />
        <Route path="/aliases" element={<Aliases />} />
      </Route>
    </Routes>
  );
}

export default App;
