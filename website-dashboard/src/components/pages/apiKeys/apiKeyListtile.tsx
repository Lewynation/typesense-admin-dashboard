import clsx from "clsx";
import date from "date-and-time";
import { deleteAPIKey } from "../../../redux/slices/deletions/deletionAsyncThunks";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
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
  const dispatch = useAppDispatch();
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );
  const className = clsx("font-lato text-sm ");
  const classNameFlex = clsx("flex items-center justify-center");

  const formatDate = (unformatedDate: number) => {
    const formatedDate = new Date(unformatedDate * 1000);
    return formatedDate;
  };

  const deleteApikey = async (keyId: number) => {
    const typesenseAuthData = {
      apiKey,
      host,
      path,
      port,
      protocol,
    };
    const payload = {
      typesenseAuthData,
      keyId,
    };
    await dispatch(deleteAPIKey(payload)).unwrap();
  };

  return (
    <div className="grid grid-cols-5 gap-4 px-3 border-b-2 py-2 dark:text-gray-300 dark:border-gray-600">
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
          {expiresAt === 64723363199
            ? "Never"
            : date.format(formatDate(expiresAt), "ddd, MMM DD YYYY")}
          {}
        </p>
      </div>
      <div className={classNameFlex}>
        <div className={clsx(classNameFlex, "gap-5")}>
          <div>
            <Deleteicon
              className="text-red-600 hover:cursor-pointer hover:scale-125 duration-100"
              onClick={() => deleteApikey(uniqueId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiKeyListTile;
