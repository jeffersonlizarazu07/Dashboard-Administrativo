const SearchBar = ({ value, onChange }) => (
  <input 
    type="text"
    className="search-input" 
    placeholder="Buscar usuarios..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchBar;
