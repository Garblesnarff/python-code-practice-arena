
import * as React from "react";
import { Command } from "cmdk";
import { Search, FileCode, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { problems } from "@/data/problems";
import { Dialog } from "@/components/ui/dialog";

// Type for search items
interface SearchItem {
  id: string;
  type: string;
  title: string;
  description: string;
  path: string;
  difficulty?: string; // Make difficulty optional
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Create searchable items from problems
  const searchItems: SearchItem[] = React.useMemo(() => {
    const items: SearchItem[] = [];
    
    // Add problems
    problems.forEach(problem => {
      items.push({
        id: problem.id,
        type: "problem",
        title: problem.title,
        description: problem.description,
        path: `/problems/${problem.id}`,
        difficulty: problem.difficulty
      });
    });
    
    // Add other searchable items here in the future
    // For example: courses, topics, etc.
    
    return items;
  }, []);
  
  const filteredItems = React.useMemo(() => {
    if (!searchQuery) return searchItems;
    
    const query = searchQuery.toLowerCase();
    return searchItems.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
  }, [searchItems, searchQuery]);

  // Focus the input when the dialog opens
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Handle selecting an item
  const handleSelect = (item: SearchItem) => {
    navigate(item.path);
    onOpenChange(false);
  };

  // Close the dialog
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <div className="fixed left-[50%] top-[20%] z-50 grid w-full max-w-lg translate-x-[-50%] gap-4 border bg-background p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg">
          <Command className="rounded-lg border-0 shadow-md">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input
                ref={inputRef}
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Search problems..."
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="p-1">
                  <X className="h-4 w-4 opacity-50" />
                </button>
              )}
              <button onClick={handleClose} className="ml-2 p-1">
                <X className="h-5 w-5" />
              </button>
            </div>
            <Command.List className="max-h-[300px] overflow-y-auto p-0">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.title}
                    onSelect={() => handleSelect(item)}
                    className="px-4 py-2 cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-start gap-2 text-sm">
                      <FileCode className="h-4 w-4 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {item.description}
                        </div>
                      </div>
                      {item.difficulty && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                          item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.difficulty}
                        </span>
                      )}
                    </div>
                  </Command.Item>
                ))
              ) : (
                <div className="py-6 text-center text-sm">No results found.</div>
              )}
            </Command.List>
          </Command>
        </div>
      </div>
    </Dialog>
  );
}
