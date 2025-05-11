
import { Problem } from './types';

// Course 1: Python Foundations for Beginners

// Problem Set A: Python Basics
export const pythonBasicsProblems: Problem[] = [
  {
    id: 'c1-basics-variables',
    title: 'Variables and Assignment',
    description: 'Create a function that initializes different types of variables (integer, string, float, and boolean) and returns their values as a tuple.',
    difficulty: 'Easy',
    starter_code: 'def initialize_variables():\n    # Initialize an integer, string, float, and boolean variable\n    # Return them as a tuple in that order\n    pass',
    solution_code: 'def initialize_variables():\n    num = 42\n    text = "Hello, Python!"\n    decimal = 3.14\n    is_active = True\n    return (num, text, decimal, is_active)',
    test_cases: [
      {
        input: [],
        expected_output: [42, "Hello, Python!", 3.14, True],
      }
    ],
    examples: [
      {
        input: "",
        output: "(42, 'Hello, Python!', 3.14, True)",
      }
    ],
    hints: [
      'Use the = operator to assign values to variables',
      'Python variables don\'t need type declarations',
      'Return multiple values by separating them with commas inside parentheses'
    ],
    time_complexity: 'O(1)',
    space_complexity: 'O(1)',
    course_id: 'course-1',
    topic_id: 'topic-basics',
  },
  {
    id: 'c1-basics-math',
    title: 'Basic Math Operations',
    description: 'Write functions to perform addition, subtraction, multiplication, division, and modulus operations.',
    difficulty: 'Easy',
    starter_code: 'def add(a, b):\n    # Add two numbers\n    pass\n\ndef subtract(a, b):\n    # Subtract b from a\n    pass\n\ndef multiply(a, b):\n    # Multiply two numbers\n    pass\n\ndef divide(a, b):\n    # Divide a by b\n    # Return None if b is zero\n    pass\n\ndef modulus(a, b):\n    # Return the remainder of a divided by b\n    # Return None if b is zero\n    pass',
    solution_code: 'def add(a, b):\n    return a + b\n\ndef subtract(a, b):\n    return a - b\n\ndef multiply(a, b):\n    return a * b\n\ndef divide(a, b):\n    if b == 0:\n        return None\n    return a / b\n\ndef modulus(a, b):\n    if b == 0:\n        return None\n    return a % b',
    test_cases: [
      {
        input: [10, 5],
        expected_output: {
          "add": 15,
          "subtract": 5,
          "multiply": 50,
          "divide": 2.0,
          "modulus": 0
        },
      },
      {
        input: [-1, 2],
        expected_output: {
          "add": 1,
          "subtract": -3,
          "multiply": -2,
          "divide": -0.5,
          "modulus": 1
        },
      },
      {
        input: [7, 0],
        expected_output: {
          "add": 7,
          "subtract": 7,
          "multiply": 0,
          "divide": null,
          "modulus": null
        },
      }
    ],
    examples: [
      {
        input: "10, 5",
        output: "add: 15, subtract: 5, multiply: 50, divide: 2.0, modulus: 0",
      }
    ],
    hints: [
      'Use +, -, *, /, and % operators for each operation',
      'Remember to check for division by zero',
      'Python operators follow the standard order of operations'
    ],
    time_complexity: 'O(1)',
    space_complexity: 'O(1)',
    course_id: 'course-1',
    topic_id: 'topic-basics',
  },
  {
    id: 'c1-basics-type-conversion',
    title: 'Type Conversion Functions',
    description: 'Create functions to convert between string, integer, and float data types.',
    difficulty: 'Easy',
    starter_code: 'def to_int(value):\n    # Convert value to integer\n    # Return None if conversion fails\n    pass\n\ndef to_float(value):\n    # Convert value to float\n    # Return None if conversion fails\n    pass\n\ndef to_string(value):\n    # Convert value to string\n    pass',
    solution_code: 'def to_int(value):\n    try:\n        return int(value)\n    except (ValueError, TypeError):\n        return None\n\ndef to_float(value):\n    try:\n        return float(value)\n    except (ValueError, TypeError):\n        return None\n\ndef to_string(value):\n    return str(value)',
    test_cases: [
      {
        input: ["42", "3.14", 7],
        expected_output: {
          "to_int_1": 42,
          "to_int_2": 3,
          "to_int_3": 7,
          "to_float_1": 42.0,
          "to_float_2": 3.14,
          "to_float_3": 7.0,
          "to_string_1": "42",
          "to_string_2": "3.14",
          "to_string_3": "7"
        },
      },
      {
        input: ["hello", "42abc", None],
        expected_output: {
          "to_int_1": null,
          "to_int_2": null,
          "to_int_3": null,
          "to_float_1": null,
          "to_float_2": null,
          "to_float_3": null,
          "to_string_1": "hello",
          "to_string_2": "42abc",
          "to_string_3": "None"
        },
      }
    ],
    examples: [
      {
        input: '"42", "3.14", 7',
        output: "to_int('42') = 42, to_float('3.14') = 3.14, to_string(7) = '7'",
      }
    ],
    hints: [
      'Use int(), float(), and str() functions for conversions',
      'Handle potential errors with try-except blocks',
      'str() can convert almost anything to a string'
    ],
    time_complexity: 'O(1)',
    space_complexity: 'O(1)',
    course_id: 'course-1',
    topic_id: 'topic-basics',
  },
  {
    id: 'c1-basics-boolean-logic',
    title: 'Boolean Logic',
    description: 'Implement functions using AND, OR, and NOT operations with boolean values.',
    difficulty: 'Easy',
    starter_code: 'def logical_and(a, b):\n    # Return True if both a and b are True, False otherwise\n    pass\n\ndef logical_or(a, b):\n    # Return True if either a or b is True, False otherwise\n    pass\n\ndef logical_not(a):\n    # Return the opposite of a\n    pass\n\ndef exclusive_or(a, b):\n    # Return True if exactly one of a or b is True, False otherwise\n    pass',
    solution_code: 'def logical_and(a, b):\n    return a and b\n\ndef logical_or(a, b):\n    return a or b\n\ndef logical_not(a):\n    return not a\n\ndef exclusive_or(a, b):\n    return (a or b) and not (a and b)',
    test_cases: [
      {
        input: [True, True],
        expected_output: {
          "and": True,
          "or": True,
          "not_a": False,
          "xor": False
        },
      },
      {
        input: [True, False],
        expected_output: {
          "and": False,
          "or": True,
          "not_a": False,
          "xor": True
        },
      },
      {
        input: [False, False],
        expected_output: {
          "and": False,
          "or": False,
          "not_a": True,
          "xor": False
        },
      }
    ],
    examples: [
      {
        input: "True, False",
        output: "and: False, or: True, not_a: False, xor: True",
      }
    ],
    hints: [
      'Use the and, or, and not operators in Python',
      'XOR means "exclusive OR" - true when inputs differ',
      'Python uses keywords instead of symbols for logical operators'
    ],
    time_complexity: 'O(1)',
    space_complexity: 'O(1)',
    course_id: 'course-1',
    topic_id: 'topic-basics',
  },
  {
    id: 'c1-basics-input-output',
    title: 'Input and Output',
    description: 'Create a function that formats user input into a specified output format.',
    difficulty: 'Easy',
    starter_code: 'def format_name(first_name, last_name):\n    # Return a formatted string: "Last, First"\n    pass\n\ndef format_address(street, city, state, zip_code):\n    # Return a formatted address: "Street, City, State ZIP"\n    pass\n\ndef format_date(year, month, day):\n    # Return a formatted date: "YYYY-MM-DD"\n    # Ensure month and day are two digits with leading zeros if needed\n    pass',
    solution_code: 'def format_name(first_name, last_name):\n    return f"{last_name}, {first_name}"\n\ndef format_address(street, city, state, zip_code):\n    return f"{street}, {city}, {state} {zip_code}"\n\ndef format_date(year, month, day):\n    return f"{year}-{month:02d}-{day:02d}"',
    test_cases: [
      {
        input: ["John", "Doe", "123 Main St", "Anytown", "CA", "12345", 2023, 5, 9],
        expected_output: {
          "name": "Doe, John",
          "address": "123 Main St, Anytown, CA 12345",
          "date": "2023-05-09"
        },
      },
      {
        input: ["Jane", "Smith", "456 Oak Ave", "Somewhere", "NY", "67890", 2023, 11, 23],
        expected_output: {
          "name": "Smith, Jane",
          "address": "456 Oak Ave, Somewhere, NY 67890",
          "date": "2023-11-23"
        },
      },
      {
        input: ["Alex", "Johnson", "789 Pine Rd", "Nowhere", "TX", "54321", 2023, 1, 5],
        expected_output: {
          "name": "Johnson, Alex",
          "address": "789 Pine Rd, Nowhere, TX 54321",
          "date": "2023-01-05"
        },
      }
    ],
    examples: [
      {
        input: '"John", "Doe", "123 Main St", "Anytown", "CA", "12345", 2023, 5, 9',
        output: 'name: "Doe, John", address: "123 Main St, Anytown, CA 12345", date: "2023-05-09"',
      }
    ],
    hints: [
      'Use f-strings for formatting (Python 3.6+)',
      'The :02d format specifier adds leading zeros to single-digit numbers',
      'String concatenation with + also works but is less readable'
    ],
    time_complexity: 'O(1)',
    space_complexity: 'O(1)',
    course_id: 'course-1',
    topic_id: 'topic-basics',
  }
];

// Problem Set B: Conditional Statements
export const conditionalStatementsProblems: Problem[] = [
  {
    id: 'c1-conditionals-if',
    title: 'Simple If Statements',
    description: 'Create a function that determines if a number is positive, negative, or zero.',
    difficulty: 'Easy',
    starter_code: 'def check_number(num):\n    # Return "positive" if num is greater than 0\n    # Return "negative" if num is less than 0\n    # Return "zero" if num is equal to 0\n    pass',
    solution_code: 'def check_number(num):\n    if num > 0:\n        return "positive"\n    elif num < 0:\n        return "negative"\n    else:\n        return "zero"',
    test_cases: [
      {
        input: [5],
        expected_output: "positive",
      },
      {
        input: [-3],
        expected_output: "negative",
      },
      {
        input: [0],
        expected_output: "zero",
      }
    ],
    examples: [
      {
        input: "5",
        output: "positive",
      },
      {
        input: "-3",
        output: "negative",
      }
    ],
    hints: [
      'Use if, elif, and else keywords for conditional statements',
      'The > operator checks if a value is greater than another',
      'The < operator checks if a value is less than another'
    ],
    time_complexity: 'O(1)',
    space_complexity: 'O(1)',
    course_id: 'course-1',
    topic_id: 'topic-conditionals',
  },
  {
    id: 'c1-conditionals-if-else',
    title: 'If-Else Statements',
    description: 'Implement a function that determines if a year is a leap year.',
    difficulty: 'Easy',
    starter_code: 'def is_leap_year(year):\n    # Return True if the year is a leap year, False otherwise\n    # A year is a leap year if:\n    # - It is divisible by 4\n    # - BUT if it\'s divisible by 100, it must also be divisible by 400\n    pass',
    solution_code: 'def is_leap_year(year):\n    if (year % 400 == 0):\n        return True\n    elif (year % 100 == 0):\n        return False\n    elif (year % 4 == 0):\n        return True\n    else:\n        return False',
    test_cases: [
      {
        input: [2000],
        expected_output: true,
      },
      {
        input: [1900],
        expected_output: false,
      },
      {
        input: [2020],
        expected_output: true,
      },
      {
        input: [2021],
        expected_output: false,
      }
    ],
    examples: [
      {
        input: "2000",
        output: "True",
      },
      {
        input: "1900",
        output: "False",
      }
    ],
    hints: [
      'Use the % (modulo) operator to check divisibility',
      'A number is divisible by another if the remainder is zero',
      'Think about the order of conditions to simplify your logic'
    ],
    time_complexity: 'O(1)',
    space_complexity: 'O(1)',
    course_id: 'course-1',
    topic_id: 'topic-conditionals',
  },
  {
    id: 'c1-conditionals-if-elif-else',
    title: 'If-Elif-Else Chains',
    description: 'Create a function that converts number grades to letter grades (A, B, C, D, F).',
    difficulty: 'Easy',
    starter_code: 'def get_letter_grade(score):\n    # Convert a numeric score to a letter grade\n    # 90-100: A\n    # 80-89: B\n    # 70-79: C\n    # 60-69: D\n    # 0-59: F\n    # Return "Invalid" for scores outside 0-100\n    pass',
    solution_code: 'def get_letter_grade(score):\n    if score < 0 or score > 100:\n        return "Invalid"\n    elif score >= 90:\n        return "A"\n    elif score >= 80:\n        return "B"\n    elif score >= 70:\n        return "C"\n    elif score >= 60:\n        return "D"\n    else:\n        return "F"',
    test_cases: [
      {
        input: [95],
        expected_output: "A",
      },
      {
        input: [85],
        expected_output: "B",
      },
      {
        input: [75],
        expected_output: "C",
      },
      {
        input: [65],
        expected_output: "D",
      },
      {
        input: [55],
        expected_output: "F",
      },
      {
        input: [-5],
        expected_output: "Invalid",
      },
      {
        input: [105],
        expected_output: "Invalid",
      }
    ],
    examples: [
      {
        input: "95",
        output: "A",
      },
      {
        input: "65",
        output: "D",
      }
    ],
    hints: [
      'Use a chain of if-elif-else statements',
      'Check for invalid inputs first',
      'Order your conditions from highest to lowest grade'
    ],
    time_complexity: 'O(1)',
    space_complexity: 'O(1)',
    course_id: 'course-1',
    topic_id: 'topic-conditionals',
  },
  {
    id: 'c1-conditionals-nested',
    title: 'Nested Conditionals',
    description: 'Implement a function that simulates a simple password system with multiple checks.',
    difficulty: 'Medium',
    starter_code: 'def validate_password(password):\n    # Return "Valid" if password meets all requirements\n    # Return specific error message if not\n    #\n    # Requirements:\n    # - At least 8 characters long\n    # - Contains at least one uppercase letter\n    # - Contains at least one lowercase letter\n    # - Contains at least one digit\n    pass',
    solution_code: 'def validate_password(password):\n    if len(password) < 8:\n        return "Password must be at least 8 characters long"\n    \n    has_upper = False\n    has_lower = False\n    has_digit = False\n    \n    for char in password:\n        if char.isupper():\n            has_upper = True\n        elif char.islower():\n            has_lower = True\n        elif char.isdigit():\n            has_digit = True\n    \n    if not has_upper:\n        return "Password must contain at least one uppercase letter"\n    if not has_lower:\n        return "Password must contain at least one lowercase letter"\n    if not has_digit:\n        return "Password must contain at least one digit"\n    \n    return "Valid"',
    test_cases: [
      {
        input: ["Password123"],
        expected_output: "Valid",
      },
      {
        input: ["password123"],
        expected_output: "Password must contain at least one uppercase letter",
      },
      {
        input: ["PASSWORD123"],
        expected_output: "Password must contain at least one lowercase letter",
      },
      {
        input: ["Password"],
        expected_output: "Password must contain at least one digit",
      },
      {
        input: ["Pass1"],
        expected_output: "Password must be at least 8 characters long",
      }
    ],
    examples: [
      {
        input: '"Password123"',
        output: '"Valid"',
      },
      {
        input: '"Pass1"',
        output: '"Password must be at least 8 characters long"',
      }
    ],
    hints: [
      'Check the length requirement first',
      'Use isupper(), islower(), and isdigit() methods to check character types',
      'Use boolean flags to track which requirements have been met'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(1)',
    course_id: 'course-1',
    topic_id: 'topic-conditionals',
  },
  {
    id: 'c1-conditionals-ternary',
    title: 'Ternary Operator',
    description: 'Convert conventional if-else statements to ternary operators.',
    difficulty: 'Medium',
    starter_code: 'def is_even(num):\n    # Return "Even" for even numbers and "Odd" for odd numbers\n    # Use the ternary operator (condition_is_true if condition else condition_is_false)\n    pass\n\ndef get_absolute(num):\n    # Return the absolute value of a number\n    # Use the ternary operator\n    pass\n\ndef max_of_two(a, b):\n    # Return the larger of two numbers\n    # Use the ternary operator\n    pass',
    solution_code: 'def is_even(num):\n    return "Even" if num % 2 == 0 else "Odd"\n\ndef get_absolute(num):\n    return num if num >= 0 else -num\n\ndef max_of_two(a, b):\n    return a if a >= b else b',
    test_cases: [
      {
        input: [4, -5, 10, 7],
        expected_output: {
          "is_even_1": "Even",
          "is_even_2": "Odd",
          "get_absolute_1": 4,
          "get_absolute_2": 5,
          "max_of_two": 10
        },
      },
      {
        input: [7, -3, -10, -5],
        expected_output: {
          "is_even_1": "Odd",
          "is_even_2": "Odd",
          "get_absolute_1": 7,
          "get_absolute_2": 3,
          "max_of_two": -5
        },
      }
    ],
    examples: [
      {
        input: "4, -5, 10, 7",
        output: 'is_even(4): "Even", get_absolute(-5): 5, max_of_two(10, 7): 10',
      }
    ],
    hints: [
      'The Python ternary operator format is: value_if_true if condition else value_if_false',
      'For the absolute value, remember to negate negative numbers',
      'The comparison operators (<, >, <=, >=) work with all numeric types'
    ],
    time_complexity: 'O(1)',
    space_complexity: 'O(1)',
    course_id: 'course-1',
    topic_id: 'topic-conditionals',
  }
];

// Combine all Course 1 problems
export const course1Problems: Problem[] = [
  ...pythonBasicsProblems,
  ...conditionalStatementsProblems
];
