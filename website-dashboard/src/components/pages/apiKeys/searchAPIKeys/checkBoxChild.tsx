/* eslint-disable jsx-a11y/label-has-associated-control */

interface Props {
  label: string;
  description: string;
}

function CheckboxChild({ label, description }: Props) {
  return (
    <li className="ml-2">
      <label className=" grid grid-cols-2">
        <div className="text-sm font-lato">
          <input
            type="checkbox"
            name=""
            value="repo_deployment"
            className="mr-2"
          />
          {label}
        </div>
        <p className="text-sm font-lato">{description}</p>
      </label>
    </li>
  );
}
export default CheckboxChild;
