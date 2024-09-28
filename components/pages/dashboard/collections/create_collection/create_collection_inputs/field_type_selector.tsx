import { Icons } from "@/components/ui";

interface IFieltTypesProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  valuesList: string[];
  label: React.ReactNode;
}

const FieldTypeSelector: React.FC<IFieltTypesProps> = ({
  onChange,
  valuesList,
  label,
}) => {
  return (
    <div className="my-4">
      {label}
      <div className="relative flex items-center w-full text-gray-400 focus-within:text-black">
        <Icons.ChevronDown className="absolute w-5 h-5 mr-3 pointer-events-none right-2" />
        <select
          className="w-full px-2 py-2 border-2 border-gray-300 rounded-lg outline-none appearance-none font-oswald"
          onChange={onChange}
        >
          {valuesList.map((fieldType, index) => {
            return (
              <option key={index} value={fieldType}>
                {fieldType}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FieldTypeSelector;
