import ListLayout from "../../../layouts/listLayout/listLayout";
import CollectionListTiles from "./collectionListTile";
import CollectionListTitle from "./collectionListTitle";
import { collectionTempData } from "./mockData";

function CollectionList() {
  return (
    <ListLayout>
      <CollectionListTitle />
      {collectionTempData.map((collection) => {
        return (
          <CollectionListTiles
            key={collection.collectionName}
            collectionName={collection.collectionName}
            collectionCreatedAt={collection.collectionCreatedAt}
            collectionDocuments={collection.collectionDocuments}
            collectionSchemaFields={collection.collectionSchemaFields}
          />
        );
      })}
    </ListLayout>
  );
}

export default CollectionList;
