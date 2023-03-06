import CheckboxChild from "./checkBoxChild";
import CheckboxParent from "./checkBoxParent";

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
  return (
    <li className="border-b-2 p-2">
      <CheckboxParent label={parentLabel} description={parentDescription} />
      <ul>
        {childrenNodes.map((child) => {
          return (
            <CheckboxChild
              key={child.value}
              description={child.description}
              label={child.label}
            />
          );
        })}
      </ul>
    </li>
  );
}

export default CheckboxNode;
