import React from "react";
import { Icons } from "@/components/ui";
import { locale as locales } from "@/constants";

interface ILocaleSelectorProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LocaleSelector: React.FC<ILocaleSelectorProps> = ({ onChange }) => {
  return (
    <div className="my-4">
      <p className="text-sm font-oswald">Select locale</p>
      <div className="relative flex items-center w-full text-gray-400 focus-within:text-black">
        <Icons.ChevronDown className="absolute w-5 h-5 mr-3 pointer-events-none right-2" />
        <select
          className="w-full px-2 py-2 border-2 border-gray-300 rounded-lg outline-none appearance-none font-oswald"
          onChange={onChange}
        >
          {Object.keys(locales).map((locale, index) => {
            return (
              <option key={index} value={locales[locale]}>
                {locale}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default LocaleSelector;
