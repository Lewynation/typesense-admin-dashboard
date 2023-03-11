import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openAdminAPIKeyModal } from "../../../redux/slices/modalSlice/modalSlice";
import Button from "../../shared/button/button";
import { ReactComponent as PlusIcon } from "./svgs/plus.svg";

function ApiKeyHeading() {
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCLick = (): void => {
    // console.log("clicked");
  };
  const onMouseEnter = (): void => {
    setShow(true);
  };
  const onMouseLeave = (): void => {
    setShow(false);
  };
  const onMouseEnter1 = (): void => {
    setShow1(true);
  };
  const onMouseLeave1 = (): void => {
    setShow1(false);
  };

  const generateAdminAPIKey = () => {
    dispatch(openAdminAPIKeyModal());
  };
  const generateSearchAPIKey = () => {
    navigate("/api-keys/search-api-key");
  };
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <p className="font-bold font-lato text-xl dark:text-gray-300">API Keys</p>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="relative"
      >
        <Button text="Create API Key" onClick={onCLick} Icon={PlusIcon} />
        {show || show1 ? (
          <div
            className={clsx(
              `absolute ${
                show ? "opacity-100" : "opacity-0"
              } duration-150 w-48 bg-[#f1f0fe] rounded-lg -translate-x-16 -bottom-[99px] dark:bg-[#161b22]`
            )}
            onMouseEnter={onMouseEnter1}
            onFocus={onMouseEnter1}
            onMouseLeave={onMouseLeave1}
          >
            <div
              onClick={generateAdminAPIKey}
              role="none"
              className="text-xs font-lato p-2 border-b-2 cursor-pointer hover:bg-gray-200 hover:rounded-t-lg border-gray-600 hover:dark:bg-[#21262c]"
            >
              <p className="font-bold dark:text-gray-300">
                Generate Admin API Key
              </p>
              <p className="text-gray-400">Does all operations</p>
            </div>
            <div
              onClick={generateSearchAPIKey}
              role="none"
              className="text-xs p-2 font-lato cursor-pointer hover:bg-gray-200 hover:rounded-b-lg hover:dark:bg-[#21262c]"
            >
              <p className="font-bold dark:text-gray-300">
                Generate Search API Key
              </p>
              <p className="text-gray-400">Limits scope to only search</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ApiKeyHeading;
