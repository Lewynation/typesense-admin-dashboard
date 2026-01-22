"use client";
import { useSearchCheckBoxes } from "@/contexts/react_context/check_box_context";

interface Props {
  label: string;
  value: string;
  description: string;
  selected: boolean;
}

function CheckboxParent({ value, label, description, selected }: Props) {
  const { toggleTitleCheckbox } = useSearchCheckBoxes();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleTitleCheckbox(event.target.value);
  };
  return (
    <label className=" grid grid-cols-[1fr_1.5fr]">
      <div className="text-sm font-mono">
        <input
          type="checkbox"
          name={label}
          value={value}
          className="mr-2 dark:accent-[#d8d8d8]"
          onChange={onChange}
          checked={selected}
        />
        {label}
      </div>
      <p className="text-sm font-mono text-accent-foreground">{description}</p>
    </label>
  );
}

export default CheckboxParent;
