import { useState } from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import Button from "../../../shared/button/button";
import CheckBoxesTree from "./checkBoxesTree";
import { ReactComponent as KeySVG } from "./svgs/key.svg";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import {
  setCollectionListEmpty,
  setRequired,
} from "../../../../redux/slices/searchAPIKeyActions/serachAPIKeyActions";
import { createSearchOnlyAPIKey } from "../../../../redux/slices/typesenseSlice/asyncThunks";
import { generateKeySchema, validate } from "./utils/searchAPIKeyUtils";
import SearchAPIKeysDataCollection from "./dataCollection/dataCollection";

function SearchAPIKeys() {
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { searchCheckBoxes } = useAppSelector(
    (state) => state.searchCheckBoxes
  );
  const { APIKeyDescription, expiryDate, collectionList } = useAppSelector(
    (state) => state.searchAPIKeyActionsSlice
  );

  const validateDescription = () => {
    dispatch(setRequired(true));
  };

  const validateCollectionList = () => {
    dispatch(setCollectionListEmpty(true));
  };

  const onGenerateSearchAPIKeyBtnClick = () => {
    setLoading(true);
    const isValid = validate(searchCheckBoxes);
    if (!isValid) {
      setInvalid(true);
      setLoading(false);
      return;
    }
    setInvalid(false);
    const keySchema = generateKeySchema({
      searchCheckBoxes,
      APIKeyDescription,
      collectionList,
      expiryDate,
      validateDescription,
      validateCollectionList,
    });
    if (!keySchema) {
      setLoading(false);
      return;
    }
    dispatch(createSearchOnlyAPIKey(keySchema)).unwrap();
    setLoading(false);
    navigate("/api-keys");
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <SearchAPIKeysDataCollection />
        <CheckBoxesTree />
        <div className="flex gap-6 mt-2 mb-6 ml-2 items-center">
          {loading ? (
            <div className="flex items-center ml-3">
              <BarLoader color="#3B82F6" loading={loading} width={80} />
            </div>
          ) : (
            <Button
              text="Generate API Key"
              onClick={onGenerateSearchAPIKeyBtnClick}
              Icon={KeySVG}
            />
          )}
          <button
            type="button"
            onClick={() => {
              navigate("/api-keys");
            }}
            className="outline-none text-blue-500 font-bold font-lato cursor-pointer"
          >
            Cancel
          </button>
          {invalid && (
            <p className="font-lato font-bold text-base text-red-600">
              Select a scope to continue...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchAPIKeys;
