import SearchBar from "../common/SearchBar";
import Button from "../common/Button";

const LeadToolbar = ({ onCreateLead }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <SearchBar placeholder="Search Leads..." />

      <Button
        className="w-auto px-6"
        onClick={onCreateLead}
      >
        + Create Lead
      </Button>
    </div>
  );
};

export default LeadToolbar;