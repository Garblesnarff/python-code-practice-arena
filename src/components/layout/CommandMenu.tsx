
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useSearch } from '@/contexts/SearchContext';

export function CommandMenu() {
  const navigate = useNavigate();
  const { isSearchOpen, closeSearch } = useSearch();

  const runCommand = React.useCallback((command: () => unknown) => {
    closeSearch();
    command();
  }, [closeSearch]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // Toggle the command menu
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={isSearchOpen} onOpenChange={closeSearch}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => navigate("/"))}
          >
            Home
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/learning-paths"))}
          >
            Learning Paths
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/daily-challenges"))}
          >
            Daily Challenges
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/analytics"))}
          >
            Analytics
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Difficulty Levels">
          <CommandItem
            onSelect={() => runCommand(() => navigate("/easy"))}
          >
            Easy Problems
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/medium"))}
          >
            Medium Problems
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/hard"))}
          >
            Hard Problems
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export default CommandMenu;
