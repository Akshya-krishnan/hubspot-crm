import { Link } from "react-router-dom";

const DealTable = ({
  deals,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="text-center py-10">
        Loading deals...
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No deals found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Deal Name</th>
            <th className="text-left p-4">Company</th>
            <th className="text-left p-4">Contact</th>
            <th className="text-left p-4">Amount</th>
            <th className="text-left p-4">Stage</th>
            <th className="text-left p-4">Close Date</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {deals.map((deal) => (
            <tr
              key={deal._id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4 font-medium">
                <Link
                  to={`/deals/${deal._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {deal.dealName}
                </Link>
              </td>

              <td className="p-4">
                {deal.company || "-"}
              </td>

              <td className="p-4">
                {deal.contact || "-"}
              </td>

              <td className="p-4">
                ₹{Number(deal.amount).toLocaleString()}
              </td>

              <td className="p-4">
                {deal.stage}
              </td>

              <td className="p-4">
                {deal.closeDate
                  ? new Date(deal.closeDate).toLocaleDateString()
                  : "-"}
              </td>

              <td className="p-4">
                <div className="flex gap-3">

                  <button
                    onClick={() => onEdit(deal)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(deal._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default DealTable;