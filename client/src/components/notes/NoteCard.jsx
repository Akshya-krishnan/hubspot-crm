const NoteCard = ({
  note,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg p-4">

      <h3 className="font-semibold text-lg">
        {note.title}
      </h3>

      <p className="mt-2 text-gray-700">
        {note.content}
      </p>

      <div className="flex justify-between items-center mt-4">

        <p className="text-xs text-gray-400">
          {new Date(note.createdAt).toLocaleString()}
        </p>

        <div className="space-x-4">

          <button
            onClick={() => onEdit(note)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(note._id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default NoteCard;