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
        className="outline-none border-b-2 block w-full font-sans text-xl my-4"
        onChange={onChange}
      />
    </div>
  );
};

Input.defautProps = {
  type: "text",
};
