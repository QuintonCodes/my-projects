"use client";

import { useFilterAnalytics } from "@/hooks/use-filter-analytics";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Track filter usage for analytics
  useFilterAnalytics();

  return <>{children}</>;
}
