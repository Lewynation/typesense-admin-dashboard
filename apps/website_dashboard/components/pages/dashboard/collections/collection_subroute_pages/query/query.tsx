"use client";

import React from "react";
import {
  Configure,
  Hits,
  HitsPerPage,
  InstantSearch,
  Pagination,
  RangeInput,
  RefinementList,
  SearchBox,
  SortBy,
  Stats,
} from "react-instantsearch-dom";
import { useQuery } from "@/hooks";
import HitComponent from "./hit_component";
import { BarLoaderFullScreenWidth } from "ui";
import { ErrorComponent } from "@/components/shared/Error";

interface QueryProps {
  schemaName: string;
}

const Query: React.FC<QueryProps> = ({ schemaName }) => {
  const {
    typesenseSchemaManipulator: schemaManipulator,
    loading,
    error,
  } = useQuery(schemaName);
  const instantSearrch =
    schemaManipulator && !error ? (
      <InstantSearch
        indexName={schemaManipulator.getSchemaName()}
        searchClient={schemaManipulator.typesenseAdapter.searchClient}
      >
        <Configure hitsPerPage={9} />

        <div className="flex">
          <aside className="w-1/3 px-5 py-5 mt-2 bg-gray-100">
            <div>
              <p className="text-base font-bold font-oswald">Hits per page</p>
              <HitsPerPage
                defaultRefinement={10}
                items={[
                  { value: 10, label: "Show 10 hits" },
                  { value: 20, label: "Show 20 hits" },
                  { value: 30, label: "Show 30 hits" },
                ]}
              />
            </div>
            <div>
              <p className="text-base font-bold font-oswald">Sort By</p>
              <SortBy
                defaultRefinement={schemaManipulator.getSchemaName()}
                items={schemaManipulator.getSortByList()}
              />
            </div>
            {schemaManipulator.getFacetedNumberFields().map((field, index) => {
              return (
                <div key={index} className="flex flex-col gap-1 py-2">
                  <p className="text-xl font-bold font-oswald">{field}</p>
                  <RangeInput attribute={field} searchable={true} />
                </div>
              );
            })}
            {schemaManipulator.getFacetedStringFields().map((field, index) => {
              return (
                <div key={index} className="flex flex-col gap-1 py-2">
                  <p className="text-xl font-bold font-oswald">{field}</p>
                  <RefinementList attribute={field} searchable={true} />
                </div>
              );
            })}
          </aside>
          <main className="w-full px-6 py-5">
            <SearchBox />
            <Stats />

            <Hits
              hitComponent={(hit) => {
                const fields = schemaManipulator.getFields(hit.hit);
                return <HitComponent hit={hit.hit} keys={fields} />;
              }}
            />
            <Pagination />
          </main>
        </div>
      </InstantSearch>
    ) : (
      <ErrorComponent error={error} />
    );
  return (
    <div>
      {loading ? (
        <BarLoaderFullScreenWidth loading={loading} />
      ) : (
        instantSearrch
      )}
    </div>
  );
};

export default Query;
