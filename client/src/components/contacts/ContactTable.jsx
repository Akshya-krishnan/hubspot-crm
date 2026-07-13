import { useNavigate } from "react-router-dom";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import { Link } from "react-router-dom";

const ContactTable = ({
  contacts,
  loading,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        Loading contacts...
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        No contacts found.
      </div>
    );
  }

  return (
    <DataTable
      columns={[
        "Name",
        "Company",
        "Email",
        "Phone",
        "Stage",
        "Actions",
      ]}
    >
      {contacts.map((contact) => (
        <tr
          key={contact._id}
          className="border-b hover:bg-gray-50 transition"
        >
          <td className="p-4 font-medium">
            {contact.firstName} {contact.lastName}
          </td>

          <td className="p-4">
            {contact.company || "-"}
          </td>

          <td className="p-4">
            {contact.email}
          </td>

          <td className="p-4">
            {contact.phone || "-"}
          </td>

          <td className="p-4">
            <StatusBadge
              status={contact.lifecycleStage || "Lead"}
            />
          </td>

          <td className="p-4">
            <div className="flex gap-3 text-sm">

              <button
                onClick={() =>
                  navigate(`/contacts/${contact._id}`)
                }
                className="text-green-600 hover:underline"
              >
                View
              </button>

              <button
                onClick={() => onEdit(contact)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(contact._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>

            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default ContactTable;