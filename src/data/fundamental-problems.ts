
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
  },
  {
    id: "string_length",
    title: "String Length",
    difficulty: 'Easy',
    description: "Write a function that returns the length of a given string. This introduces you to the built-in `len()` function in Python.",
    signature_hint: "def string_length(s):",
    examples: [
      { input: "'hello'", output: "5" },
      { input: "'python'", output: "6" },
      { input: "''", output: "0" }
    ],
    test_cases: [
      { input: ["hello"], expected_output: 5 },
      { input: ["python"], expected_output: 6 },
      { input: [""], expected_output: 0 },
      { input: ["programming is fun"], expected_output: 18 }
    ],
    starter_code: "def string_length(s):\n    # Your code here\n    pass",
    solution: "def string_length(s):\n    return len(s)",
    explanation: "This function uses Python's built-in `len()` function, which returns the number of items in a container. When applied to a string, it returns the number of characters in the string. This is a simple but important concept in programming, as many algorithms need to know the size of their input data."
  },
  {
    id: "absolute_value",
    title: "Absolute Value",
    difficulty: 'Easy',
    description: "Write a function that returns the absolute value of a number. The absolute value of a number is its distance from zero on the number line, regardless of direction.",
    signature_hint: "def absolute_value(num):",
    examples: [
      { input: "5", output: "5" },
      { input: "-5", output: "5" },
      { input: "0", output: "0" }
    ],
    test_cases: [
      { input: [5], expected_output: 5 },
      { input: [-5], expected_output: 5 },
      { input: [0], expected_output: 0 },
      { input: [-10.5], expected_output: 10.5 }
    ],
    starter_code: "def absolute_value(num):\n    # Your code here\n    pass",
    solution: "def absolute_value(num):\n    return abs(num)",
    explanation: "This function uses Python's built-in `abs()` function, which returns the absolute value of a number. The absolute value is always non-negative and represents the distance of the number from zero. You could also implement this using a conditional statement: `if num < 0: return -num else: return num`"
  },
  {
    id: "to_uppercase",
    title: "String to Uppercase",
    difficulty: 'Easy',
    description: "Write a function that converts a string to uppercase. This introduces you to string methods in Python.",
    signature_hint: "def to_uppercase(s):",
    examples: [
      { input: "'hello'", output: "'HELLO'" },
      { input: "'Python'", output: "'PYTHON'" }
    ],
    test_cases: [
      { input: ["hello"], expected_output: "HELLO" },
      { input: ["Python"], expected_output: "PYTHON" },
      { input: ["ALREADY UPPER"], expected_output: "ALREADY UPPER" },
      { input: ["123"], expected_output: "123" }
    ],
    starter_code: "def to_uppercase(s):\n    # Your code here\n    pass",
    solution: "def to_uppercase(s):\n    return s.upper()",
    explanation: "This function uses the string method `.upper()` to convert all characters in the string to uppercase. String methods are functions that are built into string objects and can be called using the dot notation. Python provides many useful string methods like `.upper()`, `.lower()`, `.title()`, etc., for manipulating text."
  },
  {
    id: "find_minimum",
    title: "Minimum of Two Numbers",
    difficulty: 'Easy',
    description: "Write a function that returns the smaller of two numbers. This introduces you to comparison operators and the built-in `min()` function.",
    signature_hint: "def find_minimum(a, b):",
    examples: [
      { input: "5, 3", output: "3" },
      { input: "-1, 2", output: "-1" }
    ],
    test_cases: [
      { input: [5, 3], expected_output: 3 },
      { input: [-1, 2], expected_output: -1 },
      { input: [10, 10], expected_output: 10 },
      { input: [0, -5], expected_output: -5 }
    ],
    starter_code: "def find_minimum(a, b):\n    # Your code here\n    pass",
    solution: "def find_minimum(a, b):\n    if a < b:\n        return a\n    else:\n        return b\n\n    # Alternative solution using built-in function:\n    # return min(a, b)",
    explanation: "This function compares two numbers and returns the smaller one. It demonstrates the use of comparison operators (`<`) and conditional statements. The function checks if `a` is less than `b` and returns `a` if true, otherwise it returns `b`. Python also has a built-in `min()` function that can simplify this: `return min(a, b)`"
  },
  {
    id: "rectangle_area",
    title: "Area of a Rectangle",
    difficulty: 'Easy',
    description: "Write a function that calculates and returns the area of a rectangle given its width and height. This introduces you to simple mathematical operations in Python.",
    signature_hint: "def rectangle_area(width, height):",
    examples: [
      { input: "5, 3", output: "15" },
      { input: "2, 4", output: "8" }
    ],
    test_cases: [
      { input: [5, 3], expected_output: 15 },
      { input: [2, 4], expected_output: 8 },
      { input: [1.5, 2.5], expected_output: 3.75 },
      { input: [0, 5], expected_output: 0 }
    ],
    starter_code: "def rectangle_area(width, height):\n    # Your code here\n    pass",
    solution: "def rectangle_area(width, height):\n    return width * height",
    explanation: "This function calculates the area of a rectangle using the formula: area = width × height. It takes two parameters (width and height) and returns their product. This demonstrates a basic mathematical operation in Python using the multiplication operator (*). The concept applies to many real-world calculations and introduces the idea of applying mathematical formulas in code."
  },
  {
    id: "first_character",
    title: "First Character of String",
    difficulty: 'Easy',
    description: "Write a function that returns the first character of a string. If the string is empty, return an empty string. This introduces you to string indexing in Python.",
    signature_hint: "def first_character(s):",
    examples: [
      { input: "'hello'", output: "'h'" },
      { input: "'python'", output: "'p'" }
    ],
    test_cases: [
      { input: ["hello"], expected_output: "h" },
      { input: ["python"], expected_output: "p" },
      { input: [""], expected_output: "" },
      { input: ["a"], expected_output: "a" }
    ],
    starter_code: "def first_character(s):\n    # Your code here\n    pass",
    solution: "def first_character(s):\n    if len(s) == 0:\n        return \"\"\n    else:\n        return s[0]",
    explanation: "This function demonstrates string indexing in Python. Strings are sequences of characters, and you can access individual characters using their position (index) in square brackets. Indices start at 0, so `s[0]` gives the first character. The function first checks if the string is empty to avoid an index error, then returns the first character if it exists."
  },
  {
    id: "last_character",
    title: "Last Character of String",
    difficulty: 'Easy',
    description: "Write a function that returns the last character of a string. If the string is empty, return an empty string. This introduces you to negative indexing in Python.",
    signature_hint: "def last_character(s):",
    examples: [
      { input: "'hello'", output: "'o'" },
      { input: "'python'", output: "'n'" }
    ],
    test_cases: [
      { input: ["hello"], expected_output: "o" },
      { input: ["python"], expected_output: "n" },
      { input: [""], expected_output: "" },
      { input: ["a"], expected_output: "a" }
    ],
    starter_code: "def last_character(s):\n    # Your code here\n    pass",
    solution: "def last_character(s):\n    if len(s) == 0:\n        return \"\"\n    else:\n        return s[-1]",
    explanation: "This function demonstrates negative indexing in Python, a powerful feature where `-1` refers to the last element, `-2` to the second-to-last, and so on. The function checks if the string is empty first, and if not, it returns the character at index `-1`, which is the last character of the string. This is more elegant than using `s[len(s)-1]` to get the last character."
  },
  {
    id: "replace_character",
    title: "Replace Character in String",
    difficulty: 'Easy',
    description: "Write a function that takes a string, an old character, and a new character, and returns the string with all occurrences of the old character replaced by the new character. This introduces you to string replacement methods.",
    signature_hint: "def replace_character(s, old_char, new_char):",
    examples: [
      { input: "'hello', 'l', 'x'", output: "'hexxo'" },
      { input: "'banana', 'a', 'o'", output: "'bonono'" }
    ],
    test_cases: [
      { input: ["hello", "l", "x"], expected_output: "hexxo" },
      { input: ["banana", "a", "o"], expected_output: "bonono" },
      { input: ["python", "z", "a"], expected_output: "python" },
      { input: ["", "a", "b"], expected_output: "" }
    ],
    starter_code: "def replace_character(s, old_char, new_char):\n    # Your code here\n    pass",
    solution: "def replace_character(s, old_char, new_char):\n    return s.replace(old_char, new_char)",
    explanation: "This function uses the string method `.replace()` to substitute all occurrences of a character with another. The first argument is the character to find, and the second is the character to replace it with. This method doesn't modify the original string (strings are immutable in Python), but instead returns a new string with the replacements made. String replacement is a common operation in text processing."
  }
];
