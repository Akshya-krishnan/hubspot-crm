import { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import toast from "react-hot-toast";
import {
  createNote,
  updateNote,
} from "../../services/noteService";

const NoteForm = ({
  note,
  leadId,
  onClose,
  onNoteCreated,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (note) {
      await updateNote(note._id, formData);
      toast.success("Note updated successfully");
    } else {
      await createNote(leadId, formData);
      toast.success("Note created successfully");
    }

    onNoteCreated();
    onClose();

  } catch (error) {
    console.error(error);
    toast.error("Failed to save note");
  }
};

  useEffect(() => {
  if (note) {
    setFormData({
      title: note.title || "",
      content: note.content || "",
    });
  } else {
    setFormData({
      title: "",
      content: "",
    });
  }
}, [note]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter title"
      />

      <div>
        <label className="block mb-2 font-medium">
          Content
        </label>

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={6}
          className="w-full border rounded-lg p-3"
          placeholder="Write your note..."
        />
      </div>

      <div className="flex justify-end gap-3">

        <Button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-black hover:bg-gray-400 w-auto px-6"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="w-auto px-6"
        >
          Save Note
        </Button>

      </div>
    </form>
  );
};

export default NoteForm;