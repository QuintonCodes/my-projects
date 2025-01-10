"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-6xl font-bold text-red-600">500</h1>
      <p className="mt-4 text-xl text-white/80">
        Something went wrong. Please try again later.
      </p>
      <Button
        onClick={reset}
        className="mt-6 px-6 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700"
      >
        Retry
      </Button>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-accent text-black font-medium rounded hover:bg-accent-hover"
      >
        Go Back Home
      </Link>
    </div>
  );
}
