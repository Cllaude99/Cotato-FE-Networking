export default function Loading() {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md flex gap-5">
          <div className="bg-neutral-700 w-56 h-44" />
          <div className="flex flex-col gap-4 *:rounded-md w-full">
            <div className="bg-neutral-700 h-5 w-full" />
            <div className="bg-neutral-700 h-5 w-full" />
            <div className="bg-neutral-700 h-5 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
