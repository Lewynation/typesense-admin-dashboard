import React from "react";

interface RadioButtonGroupProps {
  setProtocol: React.Dispatch<React.SetStateAction<string>>;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ setProtocol }) => {
  return (
    <div className="flex gap-2 font-oswald">
      <p className="">Protocol: </p>
      <div className="flex gap-4">
        <div>
          <input
            type="radio"
            id="http_protocol"
            name="protocol"
            value="http"
            checked={true}
            onChange={(e) => {
              setProtocol(e.target.value);
            }}
            className="mr-1"
          />
          <label htmlFor="protocol">http</label>
        </div>
        <div>
          <input
            type="radio"
            id="https_protocol"
            name="protocol"
            value="https"
            onChange={(e) => {
              setProtocol(e.target.value);
            }}
            className="mr-1"
          />
          <label htmlFor="protocol">https</label>
        </div>
      </div>
    </div>
  );
};

export default RadioButtonGroup;
