import Drawer from "../common/Drawer";
import LeadForm from "./LeadForm";

const LeadDrawer = ({
  isOpen,
  onClose,
  lead,
  onLeadCreated,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={lead ? "Edit Lead" : "Create Lead"}
    >
      <LeadForm
        lead={lead}
        onClose={onClose}
        onLeadCreated={onLeadCreated}
      />
    </Drawer>
  );
};

export default LeadDrawer;