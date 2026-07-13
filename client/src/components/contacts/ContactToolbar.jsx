import SearchBar from "../common/SearchBar";
import Button from "../common/Button";

const ContactToolbar = ({
  search,
  onSearch,
  onCreateContact,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

      <div className="w-full md:w-80">
        <SearchBar
          placeholder="Search Contacts..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <Button
        className="w-auto px-6"
        onClick={onCreateContact}
      >
        + Create Contact
      </Button>

    </div>
  );
};

export default ContactToolbar;