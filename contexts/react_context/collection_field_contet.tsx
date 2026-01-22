import { CreateCollectionField } from "@/zod/create_collection";
import { createContext, ReactNode, useContext, useReducer } from "react";

type Action =
  | { type: "TOGGLE_TITLE_CHECKBOX"; payload: { value: string } }
  | {
      type: "TOGGLE_CHILD_CHECKBOX";
      payload: { value: string; parent: string };
    };

const defaultState: CreateCollectionField = {
  fieldType: "string",
  name: "",
  optional: false,
  facet: false,
  index: true,
  infix: false,
  stem: false,
  rangeIndex: false,
  store: true,
};

interface SearchCheckBoxesContextType {
  state: CreateCollectionField;
  toggleTitleCheckbox: (value: string) => void;
  toggleChildCheckbox: (value: string, parent: string) => void;
}

const CollectionFieldContext = createContext<SearchCheckBoxesContextType>({
  state: defaultState,
  toggleChildCheckbox: () => {},
  toggleTitleCheckbox: () => {},
});

function searchCheckBoxesReducer(
  state: CreateCollectionField,
  action: Action
): CreateCollectionField {
  switch (action.type) {
    case "TOGGLE_TITLE_CHECKBOX": {
    }

    case "TOGGLE_CHILD_CHECKBOX": {
    }

    default:
      return state;
  }
}

export function CollectionFieldContextProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: CreateCollectionField;
}) {
  const [state, dispatch] = useReducer(
    searchCheckBoxesReducer,
    initialState ?? defaultState
  );

  const toggleTitleCheckbox = (value: string) => {
    dispatch({ type: "TOGGLE_TITLE_CHECKBOX", payload: { value } });
  };

  const toggleChildCheckbox = (value: string, parent: string) => {
    dispatch({ type: "TOGGLE_CHILD_CHECKBOX", payload: { value, parent } });
  };

  return (
    <CollectionFieldContext.Provider
      value={{ state, toggleTitleCheckbox, toggleChildCheckbox }}
    >
      {children}
    </CollectionFieldContext.Provider>
  );
}

export const useSearchCheckBoxes = () => useContext(CollectionFieldContext);
