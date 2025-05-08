
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { problems } from '@/data/problems';
import { Course, Topic } from '@/types/user';

interface SearchDialogProps {
  courses?: Course[];
  topics?: Topic[];
  trigger?: React.ReactNode;
}

const SearchDialog = ({ courses = [], topics = [], trigger }: SearchDialogProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Combine all searchable items
  const searchItems = [
    ...problems.map(problem => ({
      id: problem.id,
      type: 'problem',
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      path: `/problem/${problem.id}`
    })),
    ...courses.map(course => ({
      id: course.id,
      type: 'course',
      title: course.title,
      description: course.description || '',
      path: `/courses/${course.id}`
    })),
    ...topics.map(topic => ({
      id: topic.id,
      type: 'topic',
      title: topic.title,
      description: topic.description || '',
      courseId: topic.course_id,
      path: `/courses/${topic.course_id}/topics/${topic.id}`
    }))
  ];

  const handleSelect = (item: any) => {
    setOpen(false);
    navigate(item.path);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full justify-start text-left pl-3">
            <Search className="mr-2 h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search for problems, courses, or topics
          </DialogDescription>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            <CommandGroup heading="Problems">
              {searchItems
                .filter(item => item.type === 'problem')
                .map(item => (
                  <CommandItem
                    key={`${item.type}-${item.id}`}
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
            
            {courses.length > 0 && (
              <CommandGroup heading="Courses">
                {searchItems
                  .filter(item => item.type === 'course')
                  .map(item => (
                    <CommandItem
                      key={`${item.type}-${item.id}`}
                      onSelect={() => handleSelect(item)}
                    >
                      {item.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}
            
            {topics.length > 0 && (
              <CommandGroup heading="Topics">
                {searchItems
                  .filter(item => item.type === 'topic')
                  .map(item => (
                    <CommandItem
                      key={`${item.type}-${item.id}`}
                      onSelect={() => handleSelect(item)}
                    >
                      {item.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
