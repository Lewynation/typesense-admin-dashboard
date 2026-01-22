"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface SearchAPIKeyBackBtnProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SearchAPIKeyBackBtn: React.FC<SearchAPIKeyBackBtnProps> = ({
  className,
}) => {
  const router = useRouter();
  return (
    <div className={className}>
      <ChevronLeft
        onClick={() => {
          router.replace("/api-keys");
        }}
        className="z-0"
      />
    </div>
  );
};

export default SearchAPIKeyBackBtn;
