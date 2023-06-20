import React from "react";

interface InputProps {
  placeholder: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ placeholder, type, onChange }: InputProps) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        className="block w-full my-4 text-lg border-b-2 outline-none font-oswald"
        onChange={onChange}
      />
    </div>
  );
};

Input.defautProps = {
  type: "text",
};
