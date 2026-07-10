import Drawer from "../common/Drawer";
import NoteForm from "./NoteForm";

const NoteDrawer = ({
  isOpen,
  onClose,
  leadId,
  onNoteCreated,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Create Note"
    >
      <NoteForm
        leadId={leadId}
        onClose={onClose}
        onNoteCreated={onNoteCreated}
      />
    </Drawer>
  );
};

export default NoteDrawer;