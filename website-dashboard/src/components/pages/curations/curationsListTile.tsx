import clsx from "clsx";
import { ReactComponent as EditIcon } from "./svgs/edit.svg";
import { ReactComponent as Deleteicon } from "./svgs/trash.svg";

interface Props {
  curationQuery: string;
  curationMatchType: string;
  curationIncudes: number;
  curationExcludes: number;
}

function CurationsListTile({
  curationExcludes,
  curationIncudes,
  curationMatchType,
  curationQuery,
}: Props) {
  const className = clsx("font-lato text-sm ");
  const classNameFlex = clsx("flex items-center justify-center");
  return (
    <div className="grid grid-cols-5 gap-4 px-3 border-b-2 py-2 dark:text-gray-300 dark:border-gray-600">
      <div>
        <p className={className}>{curationQuery}</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>{curationMatchType}</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>{curationIncudes}</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>{curationExcludes}</p>
      </div>
      <div className={clsx(classNameFlex, "gap-5")}>
        <div>
          <EditIcon className="hover:cursor-pointer hover:scale-125 duration-100" />
        </div>
        <div>
          <Deleteicon className="text-red-600 hover:cursor-pointer hover:scale-125 duration-100" />
        </div>
      </div>
    </div>
  );
}

export default CurationsListTile;
