import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-accent">404</h1>
      <p className="mt-4 text-xl text-white/80">Page Not Found</p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-accent text-black font-medium rounded hover:bg-accent-dark"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Custom404;
