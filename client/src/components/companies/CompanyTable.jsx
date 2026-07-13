import { Link } from "react-router-dom";
import DataTable from "../common/DataTable";

const CompanyTable = ({
  companies,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (companies.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">
          No companies found.
        </p>
      </div>
    );
  }

  return (
    <DataTable
      columns={[
        "Company",
        "Domain",
        "Industry",
        "Phone",
        "Website",
        "Actions",
      ]}
    >
      {companies.map((company) => (
        <tr
          key={company._id}
          className="border-b hover:bg-gray-50"
        >
          <td className="p-4 font-medium">
            <Link
              to={`/companies/${company._id}`}
              className="text-blue-600 hover:underline"
            >
              {company.name}
            </Link>
          </td>

          <td className="p-4">
            {company.domain || "-"}
          </td>

          <td className="p-4">
            {company.industry || "-"}
          </td>

          <td className="p-4">
            {company.phone || "-"}
          </td>

          <td className="p-4">
            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit
              </a>
            ) : (
              "-"
            )}
          </td>

          <td className="p-4">
            <button
              onClick={() => onEdit(company)}
              className="text-blue-600 hover:underline mr-3"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(company._id)}
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

export default CompanyTable;