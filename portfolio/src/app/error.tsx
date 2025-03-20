"use client";

import ErrorPage from "@/components/error-page";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    toast.error("Something went wrong! Please try again.");
  }, [error]);

  return <ErrorPage reset={reset} />;
}
