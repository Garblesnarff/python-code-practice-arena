
import { Problem } from './problems';

export const fundamentalProblems: Problem[] = [
  {
    id: "hello_world",
    title: "Hello World",
    difficulty: 'Easy',
    description: "Your first Python program! Write a function that returns the string 'Hello, World!'.",
    signature_hint: "def hello_world():",
    examples: [
      { input: "", output: "'Hello, World!'" }
    ],
    test_cases: [
      { input: [], expected_output: "Hello, World!" }
    ],
    starter_code: "def hello_world():\n    # Your code here\n    pass",
    solution: "def hello_world():\n    return \"Hello, World!\"",
    explanation: "This is the simplest possible function. It takes no inputs and simply returns the string 'Hello, World!'. In Python, we define functions using the `def` keyword, followed by the function name and parentheses which can contain parameters (though this function has none). The function body is indented and contains the code that runs when the function is called. The `return` statement specifies what value the function should output when it finishes running."
  },
  {
    id: "add_numbers",
    title: "Add Two Numbers",
    difficulty: 'Easy',
    description: "Write a function that takes two numbers as input and returns their sum. This introduces you to function parameters and basic arithmetic in Python.",
    signature_hint: "def add_numbers(a, b):",
    examples: [
      { input: "2, 3", output: "5" },
      { input: "-1, 5", output: "4" }
    ],
    test_cases: [
      { input: [2, 3], expected_output: 5 },
      { input: [-1, 5], expected_output: 4 },
      { input: [0, 0], expected_output: 0 },
      { input: [100, -100], expected_output: 0 }
    ],
    starter_code: "def add_numbers(a, b):\n    # Your code here\n    pass",
    solution: "def add_numbers(a, b):\n    return a + b",
    explanation: "This function takes two parameters (a and b) and returns their sum using the + operator. Function parameters are variables that are used within the function and get their values from the inputs provided when the function is called. The function uses the return statement to output the result of adding a and b together."
  },
  {
    id: "greet_person",
    title: "Greet a Person",
    difficulty: 'Easy',
    description: "Write a function that takes a person's name as input and returns a greeting. This introduces you to string concatenation (joining strings together).",
    signature_hint: "def greet_person(name):",
    examples: [
      { input: "'Alice'", output: "'Hello, Alice!'" },
      { input: "'Bob'", output: "'Hello, Bob!'" }
    ],
    test_cases: [
      { input: ["Alice"], expected_output: "Hello, Alice!" },
      { input: ["Bob"], expected_output: "Hello, Bob!" },
      { input: ["Python Learner"], expected_output: "Hello, Python Learner!" }
    ],
    starter_code: "def greet_person(name):\n    # Your code here\n    pass",
    solution: "def greet_person(name):\n    return \"Hello, \" + name + \"!\"",
    explanation: "This function takes a name parameter and returns a greeting string. It demonstrates string concatenation, which is joining strings together using the + operator. The function combines the string 'Hello, ' with the name parameter and adds an exclamation mark at the end. Another way to write this would be using f-strings: `return f\"Hello, {name}!\"`"
  },
  {
    id: "is_even",
    title: "Check if a Number is Even",
    difficulty: 'Easy',
    description: "Write a function that checks if a number is even. If the number is even, return True, otherwise return False. This introduces you to conditional statements and boolean values in Python.",
    signature_hint: "def is_even(number):",
    examples: [
      { input: "4", output: "True" },
      { input: "7", output: "False" }
    ],
    test_cases: [
      { input: [4], expected_output: true },
      { input: [7], expected_output: false },
      { input: [0], expected_output: true },
      { input: [-2], expected_output: true }
    ],
    starter_code: "def is_even(number):\n    # Your code here\n    pass",
    solution: "def is_even(number):\n    if number % 2 == 0:\n        return True\n    else:\n        return False",
    explanation: "This function uses the modulo operator (%) which gives the remainder when one number is divided by another. If a number is divisible by 2 with no remainder (number % 2 == 0), then it's even. The function uses an if-else statement to return True for even numbers and False for odd numbers. A shorter way to write this would be: `return number % 2 == 0`"
  }
];
