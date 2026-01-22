import Link from "next/link";

const ResourceReadmore = ({ link }: { link: string }) => {
  return (
    <p className="font-mono mt-3">
      Read more{" "}
      <span className="text-blue-500">
        <Link target="_blank" href={link}>
          here
        </Link>
      </span>
    </p>
  );
};

export default ResourceReadmore;
