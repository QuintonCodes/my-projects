import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-6xl font-bold text-accent">404</h1>
      <p className="mt-4 text-xl text-white/80">Page Not Found</p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-accent text-black font-medium rounded-xl hover:bg-accent-hover"
      >
        Go Back Home
      </Link>
    </div>
  );
}
