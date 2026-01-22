"use client";

import {
  useSearchCheckBoxes,
  ChildCheckbox,
} from "@/contexts/react_context/check_box_context";

interface Props {
  childCheckbox: ChildCheckbox;
  parentValue: string;
}

function CheckboxChild({ childCheckbox, parentValue }: Props) {
  const { toggleChildCheckbox } = useSearchCheckBoxes();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    toggleChildCheckbox(value, parentValue);
  };

  return (
    <li className="ml-2">
      <label className="grid grid-cols-[1fr_1.5fr]">
        <div className="text-sm font-mono ">
          <input
            type="checkbox"
            name={childCheckbox.label}
            value={childCheckbox.value}
            className="mr-2 dark:accent-[#d8d8d8]"
            onChange={onChange}
            checked={
              childCheckbox.enabledByTitle || childCheckbox.enabledBySelf
            }
            disabled={childCheckbox.enabledByTitle}
          />
          {childCheckbox.label}
        </div>
        <p className="text-sm font-mono text-accent-foreground">
          {childCheckbox.description}
        </p>
      </label>
    </li>
  );
}
export default CheckboxChild;
