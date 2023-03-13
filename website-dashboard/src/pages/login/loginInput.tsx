interface Props {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  textElement?: string;
  errorText?: string;
}

function LoginInput({ placeholder, onChange, textElement, errorText }: Props) {
  return (
    <div className="w-full py-1">
      <input
        type="text"
        className="outline-none rounded-sm border-b-[1px] px-2 py-2 w-full font-lato text-gray-200 bg-transparent border-gray-600"
        placeholder={placeholder}
        onChange={onChange}
      />
      {textElement && (
        <p className="text-gray-500 text-xs pl-2">{textElement}</p>
      )}
      {errorText && <p className="text-red-500 text-xs pl-2">{errorText}</p>}
    </div>
  );
}

LoginInput.defaultProps = {
  textElement: null,
  errorText: null,
};

export default LoginInput;
