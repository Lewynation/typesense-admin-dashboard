import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import date from "date-and-time";

interface Props {
  collectionName: string;
  collectionDocuments: number;
  collectionSchemaFields: number;
  collectionCreatedAt: number;
}

function CollectionListTiles({
  collectionCreatedAt,
  collectionDocuments,
  collectionName,
  collectionSchemaFields,
}: Props) {
  const className = clsx("font-lato text-sm ");
  const classNameFlex = clsx("flex items-center justify-center");
  const navigate = useNavigate();

  const navigateToCollection = (): void => {
    navigate(`/collections/${collectionName}/query`);
  };

  const formatDate = (unformatedDate: number) => {
    const formatedDate = new Date(unformatedDate * 1000);
    return formatedDate;
  };

  return (
    <div
      role="none"
      onClick={navigateToCollection}
      className="grid grid-cols-4 gap-4 px-3 border-b-2 py-2 hover:bg-[#f1f0fe] cursor-pointer"
    >
      <div>
        <p className={className}>{collectionName}</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>{collectionDocuments}</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>{collectionSchemaFields}</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>
          {date.format(formatDate(collectionCreatedAt), "ddd, MMM DD YYYY")}
        </p>
      </div>
    </div>
  );
}

export default CollectionListTiles;
