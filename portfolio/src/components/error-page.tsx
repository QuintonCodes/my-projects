"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-6xl font-bold text-red-600">Error 500</h1>
      <p className="mt-4 text-xl text-white/80">
        Something went wrong. Please try again later.
      </p>
      <Button
        className="px-6 py-3 mt-6 font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        onClick={reset}
      >
        Retry
      </Button>
      <Link
        className="px-6 py-3 mt-6 font-medium text-black bg-accent hover:bg-accent-hover"
        href="/"
      >
        Go Back Home
      </Link>
    </div>
  );
}
