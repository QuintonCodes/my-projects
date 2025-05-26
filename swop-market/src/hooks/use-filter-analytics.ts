"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// This hook tracks filter usage for analytics purposes
export function useFilterAnalytics() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Get filter parameters
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const conditions = searchParams.get("conditions");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    // Track filter usage
    const trackFilters = () => {
      // In a real app, you would send this data to your analytics service
      // For this demo, we'll just log to console
      console.log("Filter Analytics:", {
        timestamp: new Date().toISOString(),
        filters: {
          minPrice,
          maxPrice,
          conditions,
          category,
          search,
          sort,
        },
      });

      // Store in localStorage for demo purposes
      try {
        // Get existing analytics
        const existingAnalytics = localStorage.getItem("filter-analytics");
        const analytics = existingAnalytics
          ? JSON.parse(existingAnalytics)
          : { filters: {} };

        // Update analytics
        if (minPrice) {
          analytics.filters.minPrice = (analytics.filters.minPrice || 0) + 1;
        }

        if (maxPrice) {
          analytics.filters.maxPrice = (analytics.filters.maxPrice || 0) + 1;
        }

        if (conditions) {
          conditions.split(",").forEach((condition) => {
            analytics.filters[`condition_${condition}`] =
              (analytics.filters[`condition_${condition}`] || 0) + 1;
          });
        }

        if (category) {
          analytics.filters[`category_${category}`] =
            (analytics.filters[`category_${category}`] || 0) + 1;
        }

        if (search) {
          analytics.filters.search = (analytics.filters.search || 0) + 1;
        }

        if (sort) {
          analytics.filters[`sort_${sort}`] =
            (analytics.filters[`sort_${sort}`] || 0) + 1;
        }

        // Save updated analytics
        localStorage.setItem("filter-analytics", JSON.stringify(analytics));
      } catch (error) {
        console.error("Error storing filter analytics:", error);
      }
    };

    // Only track if there are filters applied
    if (minPrice || maxPrice || conditions || category || search || sort) {
      trackFilters();
    }
  }, [searchParams]);
}
