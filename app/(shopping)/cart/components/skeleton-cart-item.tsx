const SkeletonCartItem = () => {
  return (
    <div className="animate-pulse flex space-x-4 p-4 border rounded-md shadow-sm mb-6 sm:mb-0">
      <div className="w-64 h-64 bg-gray-200 rounded"></div>
      <div className="flex flex-1 flex-col space-y-4 py-1 justify-between">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};
const SkeletonCartSummary = () => {
  return (
    <div className="animate-pulse flex flex-col p-4 border rounded-md shadow-sm sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <div className="h-8 bg-gray-200 rounded w-2/4" />
      <div className="flex-1 flex py-3 justify-between">
        <div className="col-span-6 flex flex-col flex-1 space-y-3">
          {Array.from(Array(4)).map((_, idx) => (
            <div key={idx} className="h-6 bg-gray-200 rounded w-5/6" />
          ))}
        </div>
        <div className="space-y-3 flex flex-col flex-1 col-span-2 items-end">
          {Array.from(Array(4)).map((_, idx) => (
            <div key={idx} className="h-6 bg-gray-200 rounded w-1/4" />
          ))}
        </div>
      </div>
      <div className="h-10 bg-gray-400 rounded" />
    </div>
  );
};
export { SkeletonCartItem, SkeletonCartSummary };
