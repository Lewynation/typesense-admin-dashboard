"use client";
import React from "react";
import { Icons } from "@/components/ui";
import { useRouter } from "next/navigation";

interface SearchAPIKeyBackBtnProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SearchAPIKeyBackBtn: React.FC<SearchAPIKeyBackBtnProps> = ({
  className,
}) => {
  const router = useRouter();
  return (
    <div className={className}>
      <Icons.ChevronLeft
        onClick={() => {
          router.replace("/api-keys");
        }}
        className="z-0"
      />
    </div>
  );
};

export default SearchAPIKeyBackBtn;
