"use client";

import { useSearchCheckBoxes } from "@/contexts/react_context/check_box_context";

import CheckboxBranch from "./check_boxes_branch";

function CheckBoxesTree() {
  const { state } = useSearchCheckBoxes();

  return (
    <div className="p-3">
      <dl>
        <dd>
          <div className="border rounded-md">
            <ul>
              {state.searchCheckBoxes.map((node, index) => {
                return (
                  <CheckboxBranch
                    key={node.value}
                    searches={node}
                    isLast={index + 1 === state.searchCheckBoxes.length}
                  />
                );
              })}
            </ul>
          </div>
        </dd>
      </dl>
    </div>
  );
}

export default CheckBoxesTree;
