import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getNotes, deleteNote } from "../../services/noteService";

import Button from "../common/Button";
import NoteCard from "./NoteCard";
import NoteDrawer from "./NoteDrawer";

const NotesList = () => {
  const { id } = useParams();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const response = await getNotes(id);
      setNotes(response.data);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (noteId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      await deleteNote(noteId);

      toast.success("Note deleted successfully");

      fetchNotes();

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note");
    }
  };

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
          onClick={() => {
            setEditingNote(null);
            setIsDrawerOpen(true);
          }}
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
              onEdit={(note) => {
                setEditingNote(note);
                setIsDrawerOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <NoteDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingNote(null);
        }}
        leadId={id}
        note={editingNote}
        onNoteCreated={fetchNotes}
      />

    </div>
  );
};

export default NotesList;