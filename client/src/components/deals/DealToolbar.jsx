import Input from "../common/Input";
import Button from "../common/Button";

const DealToolbar = ({
  search,
  onSearch,
  onCreateDeal,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

      <div className="w-full md:w-80">
        <Input
          placeholder="Search deals..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <Button
        onClick={onCreateDeal}
        className="w-auto px-6"
      >
        + Create Deal
      </Button>

    </div>
  );
};

export default DealToolbar;