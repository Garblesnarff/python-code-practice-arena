
import { Problem } from '../data/problems';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import SolutionExplanation from './SolutionExplanation';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LightbulbIcon, BookOpen } from 'lucide-react';

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
      ],
      "is_even": [
        {
          title: "Modulo Operator (%)",
          explanation: "The modulo operator (%) calculates the remainder when one number is divided by another. For example, 7 % 3 equals 1 because when 7 is divided by 3, the remainder is 1. It's particularly useful for determining if a number is even or odd - a number is even if number % 2 equals 0."
        },
        {
          title: "Conditional Statements",
          explanation: "Conditional statements (using `if`, `elif`, and `else`) allow your code to make decisions based on certain conditions. In this problem, we check if the remainder of dividing by 2 is 0, and return `True` if it is (meaning the number is even)."
        },
        {
          title: "Boolean Values",
          explanation: "Boolean values represent True or False. In Python, expressions that use comparison operators (like ==, !=, >, <) evaluate to either True or False. The condition `number % 2 == 0` evaluates to True for even numbers and False for odd numbers."
        },
        {
          title: "Python Operators",
          explanation: "Python has several types of operators that are essential for programming:\n\n- Arithmetic operators: + (addition), - (subtraction), * (multiplication), / (division), // (floor division), % (modulo), ** (exponentiation)\n\n- Comparison operators: == (equal), != (not equal), > (greater than), < (less than), >= (greater or equal), <= (less or equal)\n\n- Logical operators: and, or, not\n\n- Assignment operators: = (simple assignment), +=, -=, *=, etc. (compound assignment)"
        }
      ]
    };
    
    return concepts[problem.id] || [];
  };

  const concepts = getProgrammingConcepts();

  // Add Python operators explanation
  const getPythonOperators = () => {
    return {
      arithmetic: [
        { operator: "+", name: "Addition", example: "5 + 3 = 8", description: "Adds two numbers together" },
        { operator: "-", name: "Subtraction", example: "5 - 3 = 2", description: "Subtracts right operand from left operand" },
        { operator: "*", name: "Multiplication", example: "5 * 3 = 15", description: "Multiplies two numbers together" },
        { operator: "/", name: "Division", example: "6 / 3 = 2.0", description: "Divides left operand by right operand (result is always a float)" },
        { operator: "//", name: "Floor Division", example: "7 // 3 = 2", description: "Divides and returns the integer value (rounded down)" },
        { operator: "%", name: "Modulo", example: "7 % 3 = 1", description: "Returns the remainder after division" },
        { operator: "**", name: "Exponentiation", example: "2 ** 3 = 8", description: "Raises left operand to the power of right operand" }
      ],
      comparison: [
        { operator: "==", name: "Equal to", example: "5 == 5 is True", description: "True if both operands are equal" },
        { operator: "!=", name: "Not equal to", example: "5 != 3 is True", description: "True if operands are not equal" },
        { operator: ">", name: "Greater than", example: "5 > 3 is True", description: "True if left operand is greater than right" },
        { operator: "<", name: "Less than", example: "5 < 3 is False", description: "True if left operand is less than right" },
        { operator: ">=", name: "Greater than or equal to", example: "5 >= 5 is True", description: "True if left operand is greater than or equal to right" },
        { operator: "<=", name: "Less than or equal to", example: "5 <= 3 is False", description: "True if left operand is less than or equal to right" }
      ],
      logical: [
        { operator: "and", name: "Logical AND", example: "True and False is False", description: "True if both operands are true" },
        { operator: "or", name: "Logical OR", example: "True or False is True", description: "True if either of the operands is true" },
        { operator: "not", name: "Logical NOT", example: "not True is False", description: "True if operand is false (complements the operand)" }
      ]
    };
  };

  // Check if the current problem is about operators
  const shouldShowOperators = problem.id === "is_even";
  const operators = getPythonOperators();

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

        {shouldShowOperators && (
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
