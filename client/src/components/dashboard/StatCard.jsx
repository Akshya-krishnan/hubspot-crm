const StatCard = ({ title, value, change }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      <p className="text-green-600 text-sm mt-3">
        {change}
      </p>
    </div>
  );
};

export default StatCard;