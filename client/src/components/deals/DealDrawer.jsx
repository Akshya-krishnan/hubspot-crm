import Drawer from "../common/Drawer";
import DealForm from "./DealForm";

const DealDrawer = ({
  isOpen,
  onClose,
  deal,
  onDealCreated,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={deal ? "Edit Deal" : "Create Deal"}
    >
      <DealForm
        deal={deal}
        onClose={onClose}
        onDealCreated={onDealCreated}
      />
    </Drawer>
  );
};

export default DealDrawer;