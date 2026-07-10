import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotes } from "../../services/noteService";
import NoteCard from "./NoteCard";

const NotesList = () => {
  const { id } = useParams();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const response = await getNotes(id);
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) {
    return <p>Loading notes...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Notes
      </h2>

      {notes.length === 0 ? (
        <p className="text-gray-500">
          No notes yet.
        </p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;