import React from "react";

interface HitComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hit: any;
  keys: Record<"inSchema" | "notInSchema", string[]>;
}

const HitComponent = ({ hit, keys }: HitComponentProps) => {
  return (
    <div className="flex flex-col w-full gap-1 px-3 py-3 my-3 bg-[#f5f7fb] rounded-md">
      <div>
        {keys.notInSchema.map((field, index) => {
          return (
            <div key={index} className="flex gap-3 ">
              <p className="font-semibold font-oswald">{field}</p>
              <p>:</p>
              <p className="font-oswald">{hit[field]}</p>
            </div>
          );
        })}
      </div>
      <div>
        {keys.inSchema.map((field, index) => {
          return (
            <div key={index} className="flex gap-3 ">
              <p className="font-semibold font-oswald">{field}</p>
              <p>:</p>
              <p className="font-oswald">{hit[field]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HitComponent;
