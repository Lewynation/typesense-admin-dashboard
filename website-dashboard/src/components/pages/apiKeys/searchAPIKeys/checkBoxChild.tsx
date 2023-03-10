/* eslint-disable jsx-a11y/label-has-associated-control */

import { toggleChildCheckbox } from "../../../../redux/slices/searchCheckBoxes/searchCheckBoxes";
import { useAppDispatch } from "../../../../redux/store/store";

interface Props {
  label: string;
  description: string;
  selectedByParent: boolean;
  selectedBySelf: boolean;
  parent: string;
}

function CheckboxChild({
  label,
  description,
  selectedByParent,
  selectedBySelf,
  parent,
}: Props) {
  const dispatch = useAppDispatch();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(toggleChildCheckbox({ value, parent }));
  };

  return (
    <li className="ml-2">
      <label className=" grid grid-cols-2">
        <div className="text-sm font-lato dark:text-gray-400">
          <input
            type="checkbox"
            name={label}
            value={label}
            className="mr-2 dark:accent-[#d8d8d8]"
            onChange={onChange}
            checked={selectedByParent || selectedBySelf}
            disabled={selectedByParent}
          />
          {label}
        </div>
        <p className="text-sm font-lato dark:text-gray-500">{description}</p>
      </label>
    </li>
  );
}
export default CheckboxChild;
