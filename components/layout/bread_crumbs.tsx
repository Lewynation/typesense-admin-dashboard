"use client";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const NavigationBreadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const params = useParams<{ id: string; name?: string }>();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="font-mono">
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {segments.map((segment, index) =>
          // segment === params.name ||
          segment === params.id ? (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              {index + 1 != segments.length && <BreadcrumbSeparator />}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>
              {index + 1 != segments.length && (
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="font-mono">
                    <Link href={`/${segments.slice(0, index + 1).join("/")}`}>
                      {segment
                        .split("-")
                        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                        .join(" ")}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
              {index + 1 == segments.length && (
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-mono">
                    {segment
                      .split("-")
                      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                      .join(" ")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              )}
              {index + 1 != segments.length && <BreadcrumbSeparator />}
            </React.Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavigationBreadcrumbs;
