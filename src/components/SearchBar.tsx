import React from "react";
import useDebounce from "../hooks/useDebounce";

interface SearchBarProps {
    setSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({  setSearch }) => {
    const debouncedSearch = useDebounce((value: string) => setSearch(value), 1000);

    return (
        <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => debouncedSearch(e.target.value)}
        />
    );
};

export default SearchBar;
