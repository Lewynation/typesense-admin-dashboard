"use client";

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
} from "react-instantsearch";
import HitComponent from "./hit_component";
import { BarLoaderFullScreenWidth } from "@/components/ui/bar_loader";
import TypesenseErrorComponent from "@/components/shared/error";
import { useQuery } from "@/hooks/use_query";
import { useShowEditCollectionDocumentModal } from "@/components/dialogs/edit_collection_document_dialog";
import { useShowCollectionDocumentDeletionConfirmationDialog } from "@/components/dialogs/delete_collection_document_confirmation_dialog";

const Query = ({ schemaName }: { schemaName: string }) => {
  const {
    typesenseSchemaManipulator: schemaManipulator,
    isLoading,
    error,
  } = useQuery(schemaName);

  const { EditCollectionDocumentDialog, setShowEditCollectionDocumentDialog } =
    useShowEditCollectionDocumentModal();
  const {
    CollectionDocumentDeletionConfirmationDialog,
    setShowCollectionDocumentDeletionConfirmationDialog,
  } = useShowCollectionDocumentDeletionConfirmationDialog();

  const instantSearrch = schemaManipulator && (
    <InstantSearch
      indexName={schemaManipulator?.getSchemaName()}
      searchClient={schemaManipulator?.typesenseAdapter.searchClient}
    >
      <EditCollectionDocumentDialog />
      <CollectionDocumentDeletionConfirmationDialog />
      <Configure hitsPerPage={10} />

      <div className="flex">
        <aside className="w-1/3 px-5 py-5 mt-2 bg-card rounded-lg">
          <div>
            <p className="text-base font-bold font-mono">Hits per page</p>
            <HitsPerPage
              defaultValue={10}
              items={[
                { value: 10, label: "Show 10 hits", default: true },
                { value: 20, label: "Show 20 hits" },
                { value: 30, label: "Show 30 hits" },
              ]}
            />
          </div>
          <div>
            <p className="text-base font-bold font-mono">Sort By</p>
            <SortBy
              defaultValue={schemaManipulator?.getSchemaName()}
              items={schemaManipulator?.getSortByList() ?? []}
            />
          </div>
          {schemaManipulator
            ?.getFacetedNumberFields()
            .map((field: string, index: number) => {
              return (
                <div key={index} className="flex flex-col gap-1 py-2">
                  <p className="text-xl font-bold font-mono">{field}</p>
                  <RangeInput attribute={field} />
                </div>
              );
            })}
          {schemaManipulator
            ?.getFacetedStringFields()
            .map((field: string, index: number) => {
              return (
                <div key={index} className="flex flex-col gap-1 py-2">
                  <p className="text-xl font-bold font-mono">{field}</p>
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
              const fields = schemaManipulator?.getFields(hit.hit);
              if (!fields) return null;
              return (
                <HitComponent
                  hit={hit.hit}
                  keys={fields}
                  handleDocumentDelete={
                    setShowCollectionDocumentDeletionConfirmationDialog
                  }
                  handleDocumentEdit={setShowEditCollectionDocumentDialog}
                />
              );
            }}
          />
          <Pagination />
        </main>
      </div>
    </InstantSearch>
  );
  return (
    <div>
      {isLoading && <BarLoaderFullScreenWidth loading={isLoading} />}
      {schemaManipulator && !error && instantSearrch}
      {error && <TypesenseErrorComponent error={error} />}
    </div>
  );
};

export default Query;
