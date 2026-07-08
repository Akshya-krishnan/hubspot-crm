import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";

const LeadTable = ({
  leads,
  loading,
  onEdit,
  onDelete,
}) => {
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
        <tr key={lead._id} className="border-b">

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
              onClick={() => onEdit(lead)}
              className="text-blue-600 hover:underline mr-4"
            >
              Edit
            </button>

            <button
  onClick={() => onDelete(lead._id)}
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