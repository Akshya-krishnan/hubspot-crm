const DataTable = ({ columns, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="text-left p-4 font-semibold text-gray-700"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default DataTable;