import React from "react";
import { TypesenseError } from "typesense/lib/Typesense/Errors";
import Image from "next/image";
import NotFoundSvg from "@/assets/svgs/not-found-dark.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorProps {
  error: TypesenseError;
}

const TypesenseErrorComponent: React.FC<ErrorProps> = ({ error }) => {
  return error && error.httpStatus === 404 ? (
    <div>
      <div className="flex items-center justify-center w-full">
        <Image
          src={NotFoundSvg}
          alt="Not Found"
          className="max-w-[20rem] max-h-80 h-auto w-auto"
        />
      </div>
      <div className="flex flex-col items-center justify-center mt-3">
        <h1 className="text-4xl font-semibold text-center font-oswald">
          Something went wrong
        </h1>
        <p className="text-lg text-center font-oswald">
          The resource you are looking for doesn&apos;t exist. 🤔🤔 You may have
          mistyped the address or your
          <br />
          typesense server may be down.
        </p>
        <Link href="/">
          <Button variant="link" className="mt-8">
            <p className=" font-oswald">Head Home</p>
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl text-center font-oswald">
        We couldn&apos;t connect the dots
      </h1>
      <p className="text-center font-oswald">
        Something weird happened.🤔🤔 You may have mistyped the address or your
        <br />
        typesense server may be down.
      </p>
      <Link href="/">
        <Button variant="link" className="mt-8">
          <p className=" font-oswald">Head Home</p>
        </Button>
      </Link>
    </div>
  );
};

export default TypesenseErrorComponent;
