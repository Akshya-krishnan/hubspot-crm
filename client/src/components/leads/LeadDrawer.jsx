import Drawer from "../common/Drawer";
import LeadForm from "./LeadForm";

const LeadDrawer = ({
  isOpen,
  onClose,
  onLeadCreated,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Create Lead"
    >
      <LeadForm
        onClose={onClose}
        onLeadCreated={onLeadCreated}
      />
    </Drawer>
  );
};

export default LeadDrawer;