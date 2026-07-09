import SearchBar from "../common/SearchBar";
import Button from "../common/Button";

const LeadToolbar = ({
  onCreateLead,
  search,
  onSearchChange,
  leadSource,
  onLeadSourceChange,
  lifecycleStage,
  onLifecycleStageChange,
}) => {
  return (
    <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">

  <SearchBar
    placeholder="Search Leads..."
    value={search}
    onChange={(e) => onSearchChange(e.target.value)}
  />

  <select
    value={leadSource}
    onChange={(e) => onLeadSourceChange(e.target.value)}
    className="border rounded-lg px-4 py-2"
  >
    <option value="">All Sources</option>
    <option value="Website">Website</option>
    <option value="Facebook">Facebook</option>
    <option value="LinkedIn">LinkedIn</option>
    <option value="Referral">Referral</option>
    <option value="Other">Other</option>
  </select>

  <select
    value={lifecycleStage}
    onChange={(e) => onLifecycleStageChange(e.target.value)}
    className="border rounded-lg px-4 py-2"
  >
    <option value="">All Stages</option>
    <option value="Subscriber">Subscriber</option>
    <option value="Lead">Lead</option>
    <option value="Marketing Qualified Lead">
      Marketing Qualified Lead
    </option>
    <option value="Sales Qualified Lead">
      Sales Qualified Lead
    </option>
    <option value="Opportunity">Opportunity</option>
    <option value="Customer">Customer</option>
  </select>

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