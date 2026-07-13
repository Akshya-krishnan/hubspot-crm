import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import { useNavigate } from "react-router-dom";

const LeadTable = ({
  leads,
  loading,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <DataTable
      columns={[
        "Name",
        "Company",
        "Email",
        "Phone",
        "Status",
        "Actions",
      ]}
    >
      {leads.map((lead) => (
        <tr
          key={lead._id}
          className="border-b hover:bg-gray-50 cursor-pointer"
          onClick={() => navigate(`/leads/${lead._id}`)}
        >
          <td className="p-4">
            {lead.firstName} {lead.lastName}
          </td>

          <td className="p-4">
            {lead.company || "-"}
          </td>

          <td className="p-4">
            {lead.email}
          </td>

          <td className="p-4">
            {lead.phone || "-"}
          </td>

          <td className="p-4">
            <StatusBadge status={lead.lifecycleStage} />
          </td>

          <td className="p-4 space-x-3">

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(lead);
              }}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(lead._id);
              }}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>

            {lead.isConverted && lead.convertedContact && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/contacts/${lead.convertedContact._id}`);
                }}
                className="text-green-600 hover:underline"
              >
                View Contact
              </button>
            )}

          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default LeadTable;