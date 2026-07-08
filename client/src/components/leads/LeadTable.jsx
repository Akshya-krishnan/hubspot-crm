import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";

const LeadTable = ({ leads, loading }) => {
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

          <td className="p-4">{lead.company}</td>

          <td className="p-4">{lead.email}</td>

          <td className="p-4">{lead.phone}</td>

          <td className="p-4">
            <StatusBadge status={lead.status} />
          </td>

          <td className="p-4">
            Edit | Delete
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default LeadTable;