import { RootState } from "@/redux/store/store";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { FieldTypes, LocaleTypes } from "./create_collection_types";

interface ICreateCollectionState {
  name: string;
  default_sorting_field?: string;
  enable_nested_fields?: boolean;
  fields: {
    name: string;
    type: FieldTypes;
    optional?: boolean;
    facet?: boolean;
    index?: boolean;
    sort?: boolean;
    locale?: LocaleTypes;
    id: string;
  }[];
}

const initialState: ICreateCollectionState = {
  name: "",
  fields: [],
};

const createCollection = createSlice({
  name: "createCollection",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDefaultSortingField: (state, action: PayloadAction<string>) => {
      state.default_sorting_field = action.payload;
    },
    setEnableNestedFields: (state, action: PayloadAction<boolean>) => {
      state.enable_nested_fields = action.payload;
    },
    addField: (
      state,
      action: PayloadAction<ICreateCollectionState["fields"][0]>
    ) => {
      state.fields.push(action.payload);
    },
    deteteSingleField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter(
        (field) => field.id !== action.payload
      );
    },
    clearCreateCollection: () => initialState,
  },
});

export default createCollection.reducer;
export const {
  addField,
  setDefaultSortingField,
  setEnableNestedFields,
  setName,
  deteteSingleField,
  clearCreateCollection,
} = createCollection.actions;

const getFields = (state: RootState) => state.createCollectionSlice.fields;

export const getFieldsForDefaultSorting = createSelector(
  [getFields],
  (fields) => {
    return fields.filter(
      (field) => field.type === "int32" || field.type === "float"
    );
  }
);
