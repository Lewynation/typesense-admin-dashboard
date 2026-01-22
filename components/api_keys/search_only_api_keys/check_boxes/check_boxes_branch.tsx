"use client";

import CheckboxChild from "./check_boxes_child";
import CheckboxParent from "./check_boxes_parent";
import { Searches } from "@/contexts/react_context/check_box_context";

type Props = {
  searches: Searches;
  isLast: boolean;
};

function CheckboxBranch({ isLast, searches }: Props) {
  return (
    <li className={`${isLast ? "" : "border-b"} p-2`}>
      <CheckboxParent
        label={searches.label}
        value={searches.value}
        description={searches.parentDescription}
        selected={searches.selected}
      />
      <ul>
        {searches.children.map((child) => {
          return (
            <CheckboxChild
              key={child.value}
              childCheckbox={child}
              parentValue={searches.value}
            />
          );
        })}
      </ul>
    </li>
  );
}

export default CheckboxBranch;
