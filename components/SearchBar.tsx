import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onRequestLocation: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onRequestLocation }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3 items-center w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-600 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 placeholder-slate-400"
        aria-label="City search input"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/40"
        aria-label="Search"
      >
        Search
      </button>
      <button
        type="button"
        onClick={onRequestLocation}
        className="p-3 bg-slate-700/80 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-500/50 transition-all duration-300"
        aria-label="Use my current location"
        title="Use my current location"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h3m14 0h3M12 2v3m0 14v3" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;