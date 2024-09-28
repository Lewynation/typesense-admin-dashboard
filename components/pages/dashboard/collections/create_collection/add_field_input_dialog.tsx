import { fieldTypes } from "@/constants";
import { addField } from "@/redux/slices/create_collection/create_collection";
import {
  FieldTypes,
  LocaleTypes,
} from "@/redux/slices/create_collection/create_collection_types";
import { useAppDispatch } from "@/redux/store/store";
import { useState } from "react";
import { Icons } from "@/components/ui";
import CreateCollectionCHeckBoxes from "./create_collection_inputs/collection_checkboxes";
import FieldTypeSelector from "./create_collection_inputs/field_type_selector";
import LocaleSelector from "./create_collection_inputs/locale_selector";

interface Props {
  closeInputFields: () => void;
}

const AddFieldInputDialog: React.FC<Props> = ({ closeInputFields }) => {
  const [fieldName, setFieldName] = useState<string>("");
  const [fieldType, setFieldType] = useState<FieldTypes>("string");
  const [fieldLocale, setFieldLocale] = useState<LocaleTypes>("default");
  const [optional, setOptional] = useState<boolean>(false);
  const [facet, setFacet] = useState<boolean>(false);
  const [index, setIndex] = useState<boolean>(false);
  const [sort, setSort] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const addFieldHandler = () => {
    if (fieldName === "") return;
    const field = {
      name: fieldName,
      type: fieldType,
      optional,
      facet,
      index,
      sort,
      locale: fieldLocale === "default" ? "" : fieldLocale,
      id: new Date().toISOString(),
    };

    dispatch(addField(field));
    closeInputFields();
  };

  const checkBoxes = [
    {
      name: "Optional",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setOptional(e.target.checked),
    },
    {
      name: "Facet",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFacet(e.target.checked),
    },
    {
      name: "Index",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setIndex(e.target.checked),
    },
    {
      name: "Sort",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSort(e.target.checked),
    },
  ];

  return (
    <div className="relative w-full py-4 bg-gray-200 rounded-3xl">
      <button className="absolute right-4 top-4" onClick={closeInputFields}>
        <Icons.X className="w-6 h-6 text-gray-400 " />
      </button>
      <div className="px-4 mt-4">
        <div className="flex gap-3">
          <div className=" grow">
            <p className="text-sm font-oswald">Enter Field name</p>
            <input
              onChange={(e) => setFieldName(e.target.value)}
              value={fieldName}
              type="text"
              placeholder="Field name"
              className="w-full px-2 py-2 border-2 border-gray-300 rounded-lg outline-none font-oswald"
            />
          </div>
          <div className="self-end">
            <button
              className="px-4 py-2 text-white bg-black rounded-full font-oswald"
              disabled={fieldName === "" ? true : false}
              onClick={addFieldHandler}
            >
              Add
            </button>
          </div>
        </div>
        <FieldTypeSelector
          label={<p className="text-sm font-oswald">Select field type</p>}
          valuesList={fieldTypes}
          onChange={(e) => setFieldType(e.target.value as FieldTypes)}
        />
        <LocaleSelector
          onChange={(e) => setFieldLocale(e.target.value as LocaleTypes)}
        />
      </div>
      <hr className="h-[2px] bg-gray-300" />
      <CreateCollectionCHeckBoxes checkBoxes={checkBoxes} />
    </div>
  );
};

export default AddFieldInputDialog;
