import Drawer from "../common/Drawer";
import NoteForm from "./NoteForm";

const NoteDrawer = ({
  isOpen,
  onClose,
  leadId,
  note,
  onNoteCreated,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={note ? "Edit Note" : "Create Note"}
    >
      <NoteForm
        note={note}
        leadId={leadId}
        onClose={onClose}
        onNoteCreated={onNoteCreated}
      />
    </Drawer>
  );
};

export default NoteDrawer;