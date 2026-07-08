import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full max-w-sm">
      <FiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5B4AE6]"
      />
    </div>
  );
};

export default SearchBar;