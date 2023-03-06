import clsx from "clsx";
import date from "date-and-time";
import { ReactComponent as Deleteicon } from "./svgs/trash.svg";

interface Props {
  keyPrefix: string;
  uniqueId: number;
  description: string;
  expiresAt: number;
}

function ApiKeyListTile({
  expiresAt,
  uniqueId,
  keyPrefix,
  description,
}: Props) {
  const className = clsx("font-lato text-sm ");
  const classNameFlex = clsx("flex items-center justify-center");

  const formatDate = (unformatedDate: number) => {
    const formatedDate = new Date(unformatedDate * 1000);
    return formatedDate;
  };

  return (
    <div className="grid grid-cols-5 gap-4 px-3 border-b-2 py-2">
      <div>
        <p className={className}>{description}</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>{keyPrefix}...</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>{uniqueId}</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>
          {date.format(formatDate(expiresAt), "ddd, MMM DD YYYY")}
        </p>
      </div>
      <div className={classNameFlex}>
        <div className={clsx(classNameFlex, "gap-5")}>
          <div>
            <Deleteicon className="text-red-600 hover:cursor-pointer hover:scale-125 duration-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiKeyListTile;
