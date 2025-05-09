
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <SearchContext.Provider 
      value={{
        searchTerm,
        setSearchTerm,
        isSearchOpen,
        openSearch,
        closeSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  
  return context;
};
