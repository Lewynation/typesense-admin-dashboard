"use client";

import { useAppSelector } from "@/redux/store/store";
import CheckboxChild from "./check_boxes_child";
import CheckboxParent from "./check_boxes_parent";

interface ChildArray {
  label: string;
  description: string;
  value: string;
}
interface Props {
  parentLabel: string;
  parentDescription: string;
  childrenNodes: ChildArray[];
}

function CheckboxNode({
  parentLabel,
  parentDescription,
  childrenNodes,
}: Props) {
  const { searchCheckBoxes } = useAppSelector(
    (state) => state.searchCheckBoxes
  );

  const getIfChecked = (
    child_: ChildArray,
    boolValue: "enabledBySelf" | "enabledByTitle"
  ) => {
    const node = searchCheckBoxes.find((item) => {
      return item.value === parentLabel;
    });
    if (node) {
      const childTree = node.children.find((item) => {
        return item.value === child_.value;
      });
      if (childTree) {
        return childTree[boolValue];
      }
    }
    return false;
  };
  const getIfParentChecked = () => {
    const node = searchCheckBoxes.find((item) => {
      return item.value === parentLabel;
    });
    if (node) {
      return node.selected;
    }
    return false;
  };
  return (
    <li className="border-b-2 p-2 dark:border-gray-600">
      <CheckboxParent
        label={parentLabel}
        description={parentDescription}
        selected={getIfParentChecked()}
      />
      <ul>
        {childrenNodes.map((child) => {
          return (
            <CheckboxChild
              key={child.value}
              description={child.description}
              label={child.label}
              parent={parentLabel}
              selectedByParent={getIfChecked(child, "enabledByTitle")}
              selectedBySelf={getIfChecked(child, "enabledBySelf")}
            />
          );
        })}
      </ul>
    </li>
  );
}

export default CheckboxNode;
