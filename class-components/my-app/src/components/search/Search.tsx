import React, { useEffect, type ChangeEvent } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './Search.css';

interface Props {
  onSearch?: (searchTerm: string) => void;
}

const LS_KEY = 'pokemon_search_term';

const Search: React.FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useLocalStorage<string>(LS_KEY, '');

  useEffect(() => {
    if (inputValue && onSearch) {
      onSearch(inputValue);
    }
  }, [inputValue, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSearch = (): void => {
    const trimmed = inputValue.trim();
    setInputValue(trimmed);
    if (onSearch) {
      onSearch(trimmed);
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter Pokemon name"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;