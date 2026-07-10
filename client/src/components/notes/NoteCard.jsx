const NoteCard = ({ note }) => {
  return (
    <div className="border rounded-lg p-4">

      <h3 className="font-semibold">
        {note.title || "Untitled"}
      </h3>

      <p className="text-gray-700 mt-2">
        {note.content}
      </p>

      <p className="text-xs text-gray-400 mt-3">
        {new Date(note.createdAt).toLocaleString()}
      </p>

    </div>
  );
};

export default NoteCard;