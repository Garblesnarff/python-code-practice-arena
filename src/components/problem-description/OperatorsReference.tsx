
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { BookOpen } from 'lucide-react';

interface OperatorInfo {
  operator: string;
  name: string;
  example: string;
  description: string;
}

interface OperatorsGrouping {
  arithmetic: OperatorInfo[];
  comparison: OperatorInfo[];
  logical: OperatorInfo[];
}

interface OperatorsReferenceProps {
  operators: OperatorsGrouping;
  showOperators: boolean;
}

const OperatorsReference: React.FC<OperatorsReferenceProps> = ({ operators, showOperators }) => {
  if (!showOperators) {
    return null;
  }

  return (
    <Accordion type="single" collapsible className="border rounded-md">
      <AccordionItem value="operators">
        <AccordionTrigger className="px-4 py-2 flex items-center">
          <div className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
            <span>Python Operators Reference</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pt-2 pb-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-base mb-2">Arithmetic Operators</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Operator</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Example</th>
                      <th className="px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operators.arithmetic.map((op, index) => (
                      <tr key={index} className="border-b dark:border-gray-700">
                        <td className="px-4 py-2 font-mono text-base">{op.operator}</td>
                        <td className="px-4 py-2">{op.name}</td>
                        <td className="px-4 py-2 font-mono">{op.example}</td>
                        <td className="px-4 py-2">{op.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-base mb-2">Comparison Operators</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Operator</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Example</th>
                      <th className="px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operators.comparison.map((op, index) => (
                      <tr key={index} className="border-b dark:border-gray-700">
                        <td className="px-4 py-2 font-mono text-base">{op.operator}</td>
                        <td className="px-4 py-2">{op.name}</td>
                        <td className="px-4 py-2 font-mono">{op.example}</td>
                        <td className="px-4 py-2">{op.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-base mb-2">Logical Operators</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Operator</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Example</th>
                      <th className="px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operators.logical.map((op, index) => (
                      <tr key={index} className="border-b dark:border-gray-700">
                        <td className="px-4 py-2 font-mono text-base">{op.operator}</td>
                        <td className="px-4 py-2">{op.name}</td>
                        <td className="px-4 py-2 font-mono">{op.example}</td>
                        <td className="px-4 py-2">{op.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-md border-l-4 border-blue-500">
              <h4 className="font-medium mb-1">Why is the modulo operator important for this problem?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                In the "is_even" function, we use the modulo operator (%) to check if a number is even. A number is even if it's divisible by 2 with no remainder. 
                The expression <code>number % 2 == 0</code> checks exactly this: if the remainder when dividing by 2 is 0, then the number is even.
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OperatorsReference;
