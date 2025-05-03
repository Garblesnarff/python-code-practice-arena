
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { LightbulbIcon } from 'lucide-react';

interface ProgrammingConceptsProps {
  concepts: { title: string; explanation: string }[];
}

const ProgrammingConcepts: React.FC<ProgrammingConceptsProps> = ({ concepts }) => {
  if (!concepts || concepts.length === 0) {
    return null;
  }

  return (
    <Accordion type="single" collapsible className="border rounded-md">
      <AccordionItem value="concepts">
        <AccordionTrigger className="px-4 py-2 flex items-center">
          <div className="flex items-center">
            <LightbulbIcon className="mr-2 h-5 w-5 text-yellow-500" />
            <span>Programming Concepts to Know</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pt-2 pb-4">
          <div className="space-y-4">
            {concepts.map((concept, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                <h3 className="font-medium text-base mb-1">{concept.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{concept.explanation}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProgrammingConcepts;
