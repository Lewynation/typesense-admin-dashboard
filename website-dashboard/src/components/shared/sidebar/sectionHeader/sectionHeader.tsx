import React from "react";

interface Props {
  title: string;
}

function SectionHeader({ title }: Props) {
  return (
    <h1 className="text-sm font-lato font-bold text-gray-500 mt-2 dark:text-gray-400">
      {title}
    </h1>
  );
}

export default SectionHeader;
