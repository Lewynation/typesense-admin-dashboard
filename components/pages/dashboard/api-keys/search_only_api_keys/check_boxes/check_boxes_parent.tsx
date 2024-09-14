"use client";
import { toggleTitleCheckbox } from "@/redux/slices/search_check_boxes/search_check_boxes";
import { useAppDispatch } from "@/redux/store/store";

interface Props {
  label: string;
  description: string;
  selected: boolean;
}

function CheckboxParent({ label, description, selected }: Props) {
  const dispatch = useAppDispatch();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleTitleCheckbox({ value: event.target.value }));
  };
  return (
    <label className=" grid grid-cols-2">
      <div className="text-sm font-oswald dark:text-gray-300">
        <input
          type="checkbox"
          name={label}
          value={label}
          className="mr-2 dark:accent-[#d8d8d8]"
          onChange={onChange}
          checked={selected}
        />
        {label}
      </div>
      <p className="text-sm font-oswald dark:text-gray-500">{description}</p>
    </label>
  );
}

export default CheckboxParent;
