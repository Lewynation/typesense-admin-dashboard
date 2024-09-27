import { RootState } from "@/redux/store/store";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { FieldTypes, LocaleTypes } from "./create_collection_types";

interface ICreateCollectionState {
  name: string;
  default_sorting_field?: string;
  enable_nested_fields?: boolean;
  token_separators?: string[];
  symbols_to_index?: string[];
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
    addSymbolToIndex: (state, action: PayloadAction<string>) => {
      if (state.symbols_to_index?.includes(action.payload)) return;
      const newSymbols = state.symbols_to_index || [];
      newSymbols.push(action.payload);
      state.symbols_to_index = newSymbols;
    },
    removeSymbolToIndex: (state, action: PayloadAction<string>) => {
      state.symbols_to_index = state.symbols_to_index?.filter(
        (symbol) => symbol !== action.payload
      );
    },
    addTokenSeparator: (state, action: PayloadAction<string>) => {
      if (state.token_separators?.includes(action.payload)) return;
      const newSeparators = state.token_separators || [];
      newSeparators.push(action.payload);
      state.token_separators = newSeparators;
    },
    removeTokenSeparator: (state, action: PayloadAction<string>) => {
      state.token_separators = state.token_separators?.filter(
        (separator) => separator !== action.payload
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
  addSymbolToIndex,
  addTokenSeparator,
  removeSymbolToIndex,
  removeTokenSeparator,
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
