
import { Problem } from '../data/problems';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import SolutionExplanation from './SolutionExplanation';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LightbulbIcon } from 'lucide-react';

interface ProblemDescriptionProps {
  problem: Problem;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const [showSolution, setShowSolution] = useState(false);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500 hover:bg-green-600';
      case 'Medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Hard':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  // Add programming concept explanations based on problem ID
  const getProgrammingConcepts = () => {
    const concepts: { [key: string]: { title: string, explanation: string }[] } = {
      "hello_world": [
        {
          title: "Functions in Python",
          explanation: "A function is a reusable block of code that performs a specific task. In Python, you define a function using the `def` keyword followed by the function name and parentheses. Functions help organize code, promote reuse, and make your programs easier to understand."
        },
        {
          title: "Return Statements",
          explanation: "The `return` statement is used in functions to send a value back to whoever called the function. When Python reaches a return statement, the function immediately stops execution and sends back the specified value."
        }
      ],
      "add_numbers": [
        {
          title: "Function Parameters",
          explanation: "Parameters are variables listed inside the parentheses in a function definition. They act as placeholders for the values that will be provided when the function is called. For example, in `def add_numbers(a, b):`, both `a` and `b` are parameters."
        },
        {
          title: "Arithmetic Operators",
          explanation: "Python supports standard arithmetic operators: addition (+), subtraction (-), multiplication (*), division (/), and more. These operators work with numbers similar to how they work in mathematics."
        }
      ],
      "sum_positives": [
        {
          title: "Conditional Statements",
          explanation: "Conditional statements (like `if` statements) allow your program to make decisions based on certain conditions. If the condition is true, the code inside the `if` block runs. In this problem, we use a condition to check if a number is positive."
        },
        {
          title: "Loops",
          explanation: "Loops let you repeat a block of code multiple times. The `for` loop is used to iterate over items in a sequence (like a list). In this problem, we use a for loop to check each number in the list."
        }
      ],
      "reverse_string": [
        {
          title: "String Indexing",
          explanation: "In Python, you can access individual characters in a string using their index, starting from 0. For example, if `s = 'hello'`, then `s[0]` is 'h', `s[1]` is 'e', and so on."
        },
        {
          title: "String Concatenation",
          explanation: "String concatenation means joining strings together. In Python, you can use the + operator to combine strings: `'hello' + 'world'` gives 'helloworld'."
        }
      ],
      "count_vowels": [
        {
          title: "String Methods",
          explanation: "Python strings come with built-in methods that help you manipulate them. For example, `s.lower()` converts a string to lowercase, and `s.upper()` converts it to uppercase."
        },
        {
          title: "Membership Test",
          explanation: "The `in` operator checks if an item is in a collection. For example, `'a' in 'apple'` is True because the letter 'a' is in the string 'apple'. We use this to check if a character is a vowel."
        }
      ]
    };
    
    return concepts[problem.id] || [];
  };

  const concepts = getProgrammingConcepts();

  return (
    <div className="p-4 h-full overflow-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          <Badge className={`${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty}
          </Badge>
        </div>
        
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown>{problem.description}</ReactMarkdown>
        </div>
        
        {concepts.length > 0 && (
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
        )}
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Function Signature:</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md overflow-x-auto">
            <code>{problem.signature_hint}</code>
          </pre>
        </div>

        {problem.examples.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Examples:</h2>
            <div className="space-y-3">
              {problem.examples.map((example, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <div className="mb-1">
                    <span className="font-medium">Input:</span> <code>{example.input}</code>
                  </div>
                  <div>
                    <span className="font-medium">Output:</span> <code>{example.output}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <SolutionExplanation 
          problem={problem} 
          isVisible={showSolution} 
          onToggle={toggleSolution} 
        />
      </div>
    </div>
  );
};

export default ProblemDescription;
