const ProgressBar = ({ progress }) => {
  return (
    <div className="mt-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-600">Progress</span>
        <span className="text-sm font-semibold">{progress}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;