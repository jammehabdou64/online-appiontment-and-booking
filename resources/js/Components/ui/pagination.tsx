import React from "react";
import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  total_pages?: number;
  last_page?: number;
}

interface PaginationProps {
  meta: PaginationMeta;
  basePath: string;
  /** Optional query params to preserve (e.g. filters). Page is added/overridden. */
  queryParams?: Record<string, string | number | undefined>;
  className?: string;
}

function buildQueryString(
  page: number,
  basePath: string,
  queryParams?: Record<string, string | number | undefined>
): string {
  const params = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        params.set(key, String(value));
      }
    });
  }
  params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : `${basePath}?page=${page}`;
}

export function Pagination({
  meta,
  basePath,
  queryParams,
  className,
}: PaginationProps) {
  const currentPage = meta.current_page;
  const lastPage = meta.total_pages ?? meta.last_page ?? 1;
  const total = meta.total;
  const perPage = Number(meta.per_page);

  if (total <= 0 || lastPage <= 1) {
    return null;
  }

  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  const prevHref =
    currentPage > 1
      ? buildQueryString(currentPage - 1, basePath, queryParams)
      : null;
  const nextHref =
    currentPage < lastPage
      ? buildQueryString(currentPage + 1, basePath, queryParams)
      : null;

  // Page numbers to show: first, last, and around current (max 7 slots)
  const pageNumbers: (number | "ellipsis")[] = [];
  if (lastPage <= 7) {
    for (let i = 1; i <= lastPage; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push("ellipsis");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(lastPage - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pageNumbers.includes(i)) pageNumbers.push(i);
    }
    if (currentPage < lastPage - 2) pageNumbers.push("ellipsis");
    if (lastPage > 1) pageNumbers.push(lastPage);
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{from}</span> to{" "}
        <span className="font-medium text-foreground">{to}</span> of{" "}
        <span className="font-medium text-foreground">{total}</span> results
      </p>
      <nav className="flex items-center gap-1" aria-label="Pagination">
        {prevHref ? (
          <Link href={prevHref}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
        )}
        <div className="flex items-center gap-1 px-1">
          {pageNumbers.map((p, i) =>
            p === "ellipsis" ? (
              <span
                key={`ellipsis-${i}`}
                className="px-2 text-sm text-muted-foreground"
              >
                …
              </span>
            ) : (
              <Link key={p} href={buildQueryString(p, basePath, queryParams)}>
                <Button
                  variant={p === currentPage ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                >
                  {p}
                </Button>
              </Link>
            )
          )}
        </div>
        {nextHref ? (
          <Link href={nextHref}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        )}
      </nav>
    </div>
  );
}
