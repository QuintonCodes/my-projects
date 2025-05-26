export default function Loading() {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen gap-2">
      <div className="w-4 h-4 bg-teal-700 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-teal-700 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-teal-700 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}
