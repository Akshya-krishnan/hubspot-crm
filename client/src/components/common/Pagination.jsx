const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-end items-center gap-4 mt-6">

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;