/* eslint-disable jsx-a11y/label-has-associated-control */

interface Props {
  label: string;
  description: string;
}

function CheckboxParent({ label, description }: Props) {
  return (
    <label className=" grid grid-cols-2">
      <div className="text-sm font-lato">
        <input type="checkbox" name="" value="repo" className="mr-2" />
        {label}
      </div>
      <p className="text-sm font-lato">{description}</p>
    </label>
  );
}

export default CheckboxParent;
