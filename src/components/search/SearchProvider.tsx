
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { problems } from '@/data/problems';

interface SearchContextType {
  openSearch: () => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextType>({
  openSearch: () => {},
  closeSearch: () => {},
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const openSearch = () => setOpen(true);
  const closeSearch = () => setOpen(false);

  // Quick search items
  const searchItems = problems.map(problem => ({
    id: problem.id,
    title: problem.title,
    description: problem.description,
    difficulty: problem.difficulty,
  }));

  const handleSelect = (item: any) => {
    setOpen(false);
    
    // Navigate based on difficulty
    switch(item.difficulty) {
      case 'Easy':
        navigate('/easy');
        break;
      case 'Medium':
        navigate('/medium');
        break;
      case 'Hard':
        navigate('/hard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <SearchContext.Provider value={{ openSearch, closeSearch }}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Problems">
            {searchItems.map(item => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item)}
                className="flex flex-col items-start"
              >
                <div className="flex items-center w-full">
                  <span>{item.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{item.difficulty}</span>
                </div>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {item.description.substring(0, 100)}
                  {item.description.length > 100 ? '...' : ''}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </SearchContext.Provider>
  );
};
