import { Label } from "../ui/label";
import CollectionFields from "./collection_fields";
import CollectionIdentity from "./identity";

const CollectionFromScratch = ({
  isCollectionEdit = false,
}: {
  isCollectionEdit?: boolean;
}) => {
  return (
    <div>
      <CollectionIdentity isCollectionEdit={isCollectionEdit} />
      <CollectionFields />
      <div className="my-5">
        <Label className="font-mono">Metadata (COMING SOON)</Label>
      </div>
    </div>
  );
};

export default CollectionFromScratch;
