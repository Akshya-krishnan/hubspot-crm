import Drawer from "../common/Drawer";
import CompanyForm from "./CompanyForm";

const CompanyDrawer = ({
  isOpen,
  onClose,
  company,
  onCompanyCreated,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={company ? "Edit Company" : "Create Company"}
    >
      <CompanyForm
        company={company}
        onClose={onClose}
        onCompanyCreated={onCompanyCreated}
      />
    </Drawer>
  );
};

export default CompanyDrawer;