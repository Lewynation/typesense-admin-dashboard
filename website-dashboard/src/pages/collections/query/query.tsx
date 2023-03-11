import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch-dom";
import { useParams } from "react-router-dom";

interface Props {
  hit: any;
}

function Hit({ hit }: Props) {
  return (
    <div>
      <h1>{hit}</h1>
    </div>
  );
}
//  host: string;
//   port: number;
//   protocol: string;
//   path?: string;
//   url?: string;
function Query() {
  const { collectionName } = useParams();
  console.log(collectionName);
  const typesenseIndstantSearchAdapter = new TypesenseInstantsearchAdapter({
    server: {
      apiKey: "abc",
      nodes: [
        {
          port: 8108,
          path: "",
          host: "localhost",
          protocol: "http",
        },
      ],
    },
    additionalSearchParameters: {
      query_by: "title,authors",
      queryByWeights: "title=10, authors=2",
    },
  });
  return (
    <div>
      <InstantSearch
        indexName={collectionName!}
        searchClient={typesenseIndstantSearchAdapter.searchClient}
      >
        <div className="flex">
          <aside className="w-1/3 bg-gray-50 h-full">Aside</aside>
          <main>
            <SearchBox />
            <Hits />
          </main>
        </div>
      </InstantSearch>
    </div>
  );
}

export default Query;
