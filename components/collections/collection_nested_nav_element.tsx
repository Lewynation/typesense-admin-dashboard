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
  const url = `${param}/${href}`;

  const checkUrlMatch = (url: string, path: string): boolean => {
    if (path.includes(url)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Link href={href} className="">
      <h3
        className={`font-mono text-lg ${
          checkUrlMatch(url, pathName)
            ? "underline font-bold underline-offset-8 text-foreground decoration-[#662d91]"
            : "text-muted-foreground"
        }`}
      >
        {title}
      </h3>
    </Link>
  );
};

export default CollectionNestedNavElement;
