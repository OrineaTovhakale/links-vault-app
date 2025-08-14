import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, className }) => {
  return (
    <div className={`search-wrapper ${className || ""}`}>
      <input
        className="search-input"
        type="text"
        placeholder="Search by title, URL, description, or tags…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search links"
        autoFocus
      />
      {value && (
        <button
          className="clear-btn"
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;