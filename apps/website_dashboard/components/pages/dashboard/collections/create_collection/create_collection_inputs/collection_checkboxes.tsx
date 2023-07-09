import React from "react";

interface Props {
  checkBoxes: {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
}

const CreateCollectionCHeckBoxes: React.FC<Props> = ({ checkBoxes }) => {
  return (
    <div className="flex gap-3 px-4 my-2">
      {checkBoxes.map(({ name, onChange }, index) => {
        return (
          <div className="flex items-center" key={index}>
            <input
              type="checkbox"
              className="mr-2"
              id={name.toLowerCase()}
              name={name.toLowerCase()}
              onChange={onChange}
            />
            <label htmlFor={name.toLowerCase()} className="font-oswald">
              {name}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CreateCollectionCHeckBoxes;
