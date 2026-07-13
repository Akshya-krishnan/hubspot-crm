import Drawer from "../common/Drawer";
import ContactForm from "./ContactForm";

const ContactDrawer = ({
  isOpen,
  onClose,
  contact,
  onContactCreated,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={contact ? "Edit Contact" : "Create Contact"}
    >
      <ContactForm
        contact={contact}
        onClose={onClose}
        onContactCreated={onContactCreated}
      />
    </Drawer>
  );
};

export default ContactDrawer;