"use client";

import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return (
        fallback || (
          <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-red-600">
              Something went wrong
            </h1>
            <p className="mt-4 text-lg text-white/80">{error?.message}</p>
            <button
              onClick={() => location.reload()}
              className="mt-6 px-6 py-3 bg-red-600 text-black font-medium rounded hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        )
      );
    }

    return children;
  }
}

export default ErrorBoundary;
