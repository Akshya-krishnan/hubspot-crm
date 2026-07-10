import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotes } from "../../services/noteService";
import NoteCard from "./NoteCard";
import Button from "../common/Button";
import NoteDrawer from "./NoteDrawer";

const NotesList = () => {
  const { id } = useParams();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Notes
        </h2>

        <Button
          className="w-auto px-5"
          onClick={() => setIsDrawerOpen(true)}
        >
          + Add Note
        </Button>
      </div>

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

      <NoteDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        leadId={id}
        onNoteCreated={fetchNotes}
      />

    </div>
  );
};

export default NotesList;