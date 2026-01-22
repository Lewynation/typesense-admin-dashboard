"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import SearchState from "@/contexts/react_context/initial_state";

export interface ChildCheckbox {
  value: string;
  label: string;
  description: string;
  enabledBySelf: boolean;
  enabledByTitle: boolean;
}

export interface Searches {
  value: string;
  label: string;
  parentDescription: string;
  selected: boolean;
  allowsAllOperations: boolean;
  children: ChildCheckbox[];
}

export interface SearchCheckBoxesState {
  searchCheckBoxes: Searches[];
}

type Action =
  | { type: "TOGGLE_TITLE_CHECKBOX"; payload: { value: string } }
  | {
      type: "TOGGLE_CHILD_CHECKBOX";
      payload: { value: string; parent: string };
    };

const initialState: SearchCheckBoxesState = {
  searchCheckBoxes: SearchState,
};

function searchCheckBoxesReducer(
  state: SearchCheckBoxesState,
  action: Action
): SearchCheckBoxesState {
  switch (action.type) {
    case "TOGGLE_TITLE_CHECKBOX": {
      const { value } = action.payload;
      const titleCheckbox = state.searchCheckBoxes.findIndex(
        (checkbox) => checkbox.value === value
      );
      if (titleCheckbox === -1) {
        return state;
      }

      const newCheckBoxes = [...state.searchCheckBoxes];
      newCheckBoxes[titleCheckbox] = {
        ...newCheckBoxes[titleCheckbox],
        selected: !newCheckBoxes[titleCheckbox].selected,
        children: newCheckBoxes[titleCheckbox].children.map((child) => ({
          ...child,
          enabledByTitle: !newCheckBoxes[titleCheckbox].selected,
        })),
      };

      return { searchCheckBoxes: newCheckBoxes };
    }

    case "TOGGLE_CHILD_CHECKBOX": {
      const { value, parent } = action.payload;
      const titleCheckbox = state.searchCheckBoxes.findIndex(
        (checkbox) => checkbox.value === parent
      );
      if (titleCheckbox === -1) {
        return state;
      }

      const node = state.searchCheckBoxes[titleCheckbox].children.findIndex(
        (child) => child.value === value
      );
      if (node === -1) {
        return state;
      }

      const newCheckBoxes = [...state.searchCheckBoxes];
      const currentTitle = newCheckBoxes[titleCheckbox];
      const currentChild = currentTitle.children[node];

      newCheckBoxes[titleCheckbox] = {
        ...currentTitle,
        selected: false,
        children: currentTitle.children.map((child, idx) => {
          if (idx !== node) return child;

          if (currentChild.enabledByTitle) {
            return { ...child, enabledByTitle: false };
          } else {
            return { ...child, enabledBySelf: !child.enabledBySelf };
          }
        }),
      };

      return { searchCheckBoxes: newCheckBoxes };
    }

    default:
      return state;
  }
}

interface SearchCheckBoxesContextType {
  state: SearchCheckBoxesState;
  toggleTitleCheckbox: (value: string) => void;
  toggleChildCheckbox: (value: string, parent: string) => void;
}

const SearchCheckBoxesContext = createContext<SearchCheckBoxesContextType>({
  state: initialState,
  toggleChildCheckbox: () => {},
  toggleTitleCheckbox: () => {},
});

export function SearchCheckBoxesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(searchCheckBoxesReducer, initialState);

  const toggleTitleCheckbox = (value: string) => {
    dispatch({ type: "TOGGLE_TITLE_CHECKBOX", payload: { value } });
  };

  const toggleChildCheckbox = (value: string, parent: string) => {
    dispatch({ type: "TOGGLE_CHILD_CHECKBOX", payload: { value, parent } });
  };

  return (
    <SearchCheckBoxesContext.Provider
      value={{ state, toggleTitleCheckbox, toggleChildCheckbox }}
    >
      {children}
    </SearchCheckBoxesContext.Provider>
  );
}

export const useSearchCheckBoxes = () => useContext(SearchCheckBoxesContext);
