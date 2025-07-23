import React, { useEffect, useState, type ChangeEvent } from 'react';

interface Props {
  onSearch?: (searchTerm: string) => void;
}

const LS_KEY = 'pokemon_search_term';

const Search: React.FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedTerm = localStorage.getItem(LS_KEY) || '';
    setInputValue(savedTerm);
    if (savedTerm && onSearch) {
      onSearch(savedTerm);
    }
  }, [onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSearch = (): void => {
    const trimmed = inputValue.trim();
    localStorage.setItem(LS_KEY, trimmed);
    if (onSearch) {
      onSearch(trimmed);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter Pokemon name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;