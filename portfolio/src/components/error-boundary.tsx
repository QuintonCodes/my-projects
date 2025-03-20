"use client";

import { useToaster } from "@/hooks/useToaster";
import React, { useEffect } from "react";
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from "react-error-boundary";
import ErrorPage from "./error-page";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { showError } = useToaster();

  useEffect(() => {
    showError("An unexpected error occured. Please try again.");
  }, [showError, error]);

  return <ErrorPage reset={resetErrorBoundary} />;
}

export default function AppErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}
