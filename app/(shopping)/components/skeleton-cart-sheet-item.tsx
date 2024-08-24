const SkeletonCartSheetItem = () => {
  return (
    <div className="animate-pulse flex space-x-4 p-4 border rounded-md shadow-sm">
      <div className="w-20 h-20 bg-gray-200 rounded"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonCartSheetItem;
