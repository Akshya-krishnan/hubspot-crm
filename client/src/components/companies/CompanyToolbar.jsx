import SearchBar from "../common/SearchBar";
import Button from "../common/Button";

const CompanyToolbar = ({
  search,
  onSearch,
  onCreateCompany,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">

      <SearchBar
        placeholder="Search Companies..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <Button
        className="w-auto px-6"
        onClick={onCreateCompany}
      >
        + Create Company
      </Button>

    </div>
  );
};

export default CompanyToolbar;