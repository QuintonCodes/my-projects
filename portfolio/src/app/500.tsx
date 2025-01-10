import Link from "next/link";

const Custom500 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-600">500</h1>
      <p className="mt-4 text-xl text-white/80">Internal Server Error</p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-red-600 text-black font-medium rounded hover:bg-red-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Custom500;
