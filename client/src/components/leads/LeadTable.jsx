import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import { useNavigate } from "react-router-dom";

const LeadTable = ({
  leads,
  loading,
  onEdit,
  onDelete,
}) => {
      if (loading) {
    return <p>Loading...</p>;
  }

  const navigate = useNavigate();

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
            {lead.company}
          </td>

          <td className="p-4">
            {lead.email}
          </td>

          <td className="p-4">
            {lead.phone}
          </td>

          <td className="p-4">
            <StatusBadge
              status={lead.lifecycleStage}
            />
          </td>

          <td className="p-4">
  <button
    onClick={(e) => {
      e.stopPropagation();
      onEdit(lead);
    }}
    className="text-blue-600 hover:underline mr-4"
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
</td>
        </tr>
      ))}
    </DataTable>
  );
};

export default LeadTable;