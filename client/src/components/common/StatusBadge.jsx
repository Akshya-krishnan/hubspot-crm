const colors = {
  New: "bg-blue-100 text-blue-700",
  Qualified: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;