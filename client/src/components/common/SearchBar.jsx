import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border rounded-lg px-4 py-2 w-80"
    />
  );
};

export default SearchBar;