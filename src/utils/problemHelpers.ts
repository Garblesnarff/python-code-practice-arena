
export const getDifficultyColor = (difficulty: string) => {
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

export const getPythonOperators = () => {
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

interface ProgrammingConcept {
  title: string;
  explanation: string;
}

export const getProgrammingConcepts = (problemId: string): ProgrammingConcept[] => {
  const concepts: { [key: string]: ProgrammingConcept[] } = {
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
    "greet_person": [
      {
        title: "String Concatenation",
        explanation: "String concatenation means joining strings together. In Python, you can use the + operator to combine strings: `'hello' + 'world'` gives 'helloworld'. In this problem, we use concatenation to join 'Hello, ' with the person's name and an exclamation mark."
      },
      {
        title: "F-strings",
        explanation: "F-strings (formatted string literals) provide a concise and convenient way to embed expressions inside string literals. Introduced in Python 3.6, they allow you to include variables and expressions directly in strings by prefixing with 'f' and using curly braces. For example: `f\"Hello, {name}!\"` where `name` is a variable."
      },
      {
        title: "String Operations",
        explanation: "Strings in Python are sequences of characters. They can be manipulated in many ways: concatenated with +, repeated with *, sliced with [], and modified with methods like .upper(), .lower(), .replace(), etc. Python provides rich functionality for working with text data."
      }
    ],
    "string_length": [
      {
        title: "Built-in Functions",
        explanation: "Python comes with many pre-written functions that are always available for you to use. The `len()` function is one of these built-in functions that returns the number of items in an object. For strings, it counts the number of characters."
      },
      {
        title: "String Basics",
        explanation: "In Python, a string is a sequence of characters enclosed in quotes (either single or double). Each character in a string occupies a position, and the total number of characters is the length of the string."
      }
    ],
    "absolute_value": [
      {
        title: "Built-in Math Functions",
        explanation: "Python provides several built-in functions for mathematical operations. The `abs()` function returns the absolute value of a number, which is its distance from zero on the number line regardless of direction."
      },
      {
        title: "Numerical Operations",
        explanation: "Python supports various numerical operations and functions. Understanding how to use these built-in capabilities is important for solving mathematical problems without having to implement complex logic yourself."
      }
    ],
    "to_uppercase": [
      {
        title: "String Methods",
        explanation: "Strings in Python have built-in methods (functions) that can be called using the dot notation. The `.upper()` method returns a new string with all characters converted to uppercase."
      },
      {
        title: "Method Calls",
        explanation: "In Python, methods are functions that belong to objects. They are called using the syntax `object.method()`. String methods don't change the original string (because strings are immutable in Python), but instead return a new string."
      }
    ],
    "find_minimum": [
      {
        title: "Comparison Operators",
        explanation: "Python uses standard comparison operators like < (less than), > (greater than), == (equal to), etc. These operators return Boolean values (True or False) and are often used in conditional statements."
      },
      {
        title: "Conditional Statements",
        explanation: "The `if-else` statement allows your program to make decisions based on conditions. If the condition after `if` is True, the first block of code runs; otherwise, the code after `else` runs."
      },
      {
        title: "The min() Function",
        explanation: "Python's built-in `min()` function returns the smallest item in an iterable or the smallest of two or more arguments. It's a concise alternative to writing conditional logic for finding the minimum value."
      }
    ],
    "rectangle_area": [
      {
        title: "Mathematical Operations",
        explanation: "Python can perform basic mathematical calculations using operators like + (addition), - (subtraction), * (multiplication), and / (division). This problem demonstrates multiplication to calculate area."
      },
      {
        title: "Applied Mathematics",
        explanation: "Programming often involves translating mathematical formulas into code. This simple example (area = width × height) shows how straightforward mathematical concepts are implemented in Python."
      }
    ],
    "first_character": [
      {
        title: "String Indexing",
        explanation: "In Python, you can access individual characters in a string using their position (index). Indices start at 0, so the first character is at index 0. The syntax is `string[index]`."
      },
      {
        title: "Conditional Logic",
        explanation: "This problem demonstrates the importance of checking for edge cases, such as empty strings. Using `if len(s) == 0:` prevents index errors that would occur if we tried to access the first character of an empty string."
      }
    ],
    "last_character": [
      {
        title: "Negative Indexing",
        explanation: "Python allows negative indices for sequences like strings. The index -1 refers to the last element, -2 to the second-to-last, and so on. This is a convenient way to access elements from the end of a sequence."
      },
      {
        title: "String Handling",
        explanation: "Working with strings often requires checking for empty strings and handling them appropriately to avoid errors. This problem shows how to safely access the last character while handling the empty string case."
      }
    ],
    "replace_character": [
      {
        title: "String Methods",
        explanation: "The `.replace()` method is one of many string methods in Python. It creates a new string where all occurrences of a specified substring are replaced with another substring."
      },
      {
        title: "String Immutability",
        explanation: "Strings in Python are immutable, meaning they cannot be changed after they are created. Methods like `.replace()` don't modify the original string, but return a new string with the changes applied."
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
      },
      {
        title: "String Slicing",
        explanation: "Python allows you to extract parts of a string using slicing notation: `string[start:stop:step]`. The reverse string operation can be done concisely with the slice notation `s[::-1]`, which means start from the end and move backwards."
      },
      {
        title: "For Loops with Range",
        explanation: "When you need to iterate through indices, the range() function is useful. The syntax `range(start, stop, step)` generates numbers from start up to (but not including) stop, incrementing by step. For reverse iteration, you can use a negative step."
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
      },
      {
        title: "Character Iteration",
        explanation: "Strings in Python are sequences of characters. You can iterate through each character using a for loop: `for char in string:`. This allows you to examine or process each character individually."
      },
      {
        title: "Accumulation Pattern",
        explanation: "This problem demonstrates the accumulation pattern, where you initialize a variable (often to 0 or empty), then process items one by one, updating the accumulator as you go. Here, we initialize a counter to 0 and increment it each time we find a vowel."
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
    ],
    "find_max": [
      {
        title: "List Indexing",
        explanation: "Python lists are indexed starting from 0. You can access elements using square brackets: `my_list[0]` gets the first element, `my_list[1]` the second, and so on."
      },
      {
        title: "Conditional Logic",
        explanation: "This problem requires checking if a number is greater than another (using the comparison operator `>`). We use this to compare each number in the list with our current maximum value."
      },
      {
        title: "Variable Initialization",
        explanation: "In this problem, we initialize a variable with a starting value (the first number in the list). As we iterate through the list, we update this variable whenever we find a larger number."
      },
      {
        title: "Edge Case Handling",
        explanation: "An important aspect of this problem is handling the edge case of an empty list. When a list has no elements, we return `None` (Python's way of representing nothing or no value)."
      }
    ],
    "is_palindrome": [
      {
        title: "String Methods",
        explanation: "Python provides useful string methods like `isalnum()` which checks if a character is alphanumeric (a letter or number), and `lower()` which converts a string to lowercase."
      },
      {
        title: "String Manipulation",
        explanation: "This problem demonstrates how to clean and process strings by removing non-alphanumeric characters and standardizing case. This is a common technique when comparing strings while ignoring formatting."
      },
      {
        title: "String Reversal",
        explanation: "We can reverse a string in Python using the slice notation `s[::-1]`. This creates a new string that reads the original string from end to beginning."
      },
      {
        title: "String Comparison",
        explanation: "The problem demonstrates comparing strings character by character. A palindrome reads the same forward and backward, so we can check if a string equals its reverse."
      }
    ],
    "count_elements": [
      {
        title: "Dictionaries",
        explanation: "Dictionaries are collections that store key-value pairs. They're useful for counting occurrences of items, as you can use the items as keys and the counts as values. Dictionaries are created using curly braces: `{}`."
      },
      {
        title: "Dictionary Operations",
        explanation: "This problem demonstrates basic dictionary operations: checking if a key exists (`if key in dictionary`), adding new key-value pairs (`dictionary[key] = value`), and updating existing values (`dictionary[key] += 1`)."
      },
      {
        title: "Iteration",
        explanation: "We iterate through each item in the input list and keep track of how many times we've seen it. This pattern of processing each item one by one is fundamental in programming."
      },
      {
        title: "Frequency Counting",
        explanation: "This is a classic frequency counting problem where we need to tally how many times each element appears. Dictionaries are perfect for this task because they provide fast lookups and make it easy to associate counts with specific elements."
      }
    ],
    "fizzbuzz": [
      {
        title: "Divisibility Testing",
        explanation: "This problem uses the modulo operator (%) to check if a number is divisible by 3 or 5. The expression `i % 3 == 0` is true when `i` is divisible by 3 (i.e., the remainder is 0)."
      },
      {
        title: "Conditional Logic",
        explanation: "The solution uses multiple conditions with if-elif-else statements to determine what to add to the result list. The order of conditions is important - we check for divisibility by both 3 and 5 first."
      },
      {
        title: "List Building",
        explanation: "We build a list incrementally by appending items one by one. This is a common pattern in Python when you need to construct a list based on some conditions or transformations."
      },
      {
        title: "Type Conversion",
        explanation: "This problem requires converting integers to strings using the `str()` function. This is necessary because our result list needs to contain string representations of numbers, not the numbers themselves."
      }
    ],
    "two_sum": [
      {
        title: "Hash Maps (Dictionaries)",
        explanation: "This solution uses a dictionary (Python's implementation of a hash map) to store numbers we've seen and their indices. Hash maps provide O(1) average time complexity for lookups, which makes this solution efficient."
      },
      {
        title: "Complement Pattern",
        explanation: "Rather than checking every possible pair (which would be inefficient), we use the 'complement' pattern. For each number, we calculate what other number would be needed to reach the target (`target - num`), and check if we've seen it before."
      },
      {
        title: "Enumerate Function",
        explanation: "The `enumerate()` function lets us iterate through a list while keeping track of both the values and their indices. This is useful when we need to return the indices of the two numbers."
      },
      {
        title: "Single-pass Algorithm",
        explanation: "This solution only needs to go through the list once (one pass), making it more efficient than a nested loop approach. We process each element once and check if we've already seen its complement."
      },
      {
        title: "Space-Time Tradeoff",
        explanation: "This problem demonstrates a common tradeoff: using extra space (the dictionary) to achieve better time complexity. Instead of O(n²) time with a nested loop, we get O(n) time at the cost of O(n) extra space."
      }
    ]
  };
  
  return concepts[problemId] || [];
};
