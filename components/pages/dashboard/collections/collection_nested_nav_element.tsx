"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CollectionNestedNavElementProps {
  param: string;
  title: string;
  href: string;
}

const CollectionNestedNavElement: React.FC<CollectionNestedNavElementProps> = ({
  param,
  href,
  title,
}) => {
  const pathName = usePathname();
  const url = `/collections/${param}${href}`;

  return (
    <Link href={url} className="">
      <h3
        className={`font-bold font-oswald text-lg ${
          pathName === url ? "underline underline-offset-4" : ""
        }`}
      >
        {title}
      </h3>
    </Link>
  );
};

export default CollectionNestedNavElement;
