import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-6xl font-bold text-accent">404</h1>
      <p className="mt-4 text-xl text-primary">Page Not Found</p>
      <Link
        className="px-6 py-3 mt-6 font-medium rounded-full text-primary bg-primary border-accent/10 hover:bg-secondary"
        href="/"
      >
        Go Back Home
      </Link>
    </div>
  );
}
