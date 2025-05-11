// Import the Problem interface
import { Problem } from './types';

// Array of problems for Course 1
export const course1Problems: Problem[] = [
  {
    id: 'variables-assignment',
    title: 'Variables and Assignment',
    difficulty: 'Easy',
    course_id: 'course-1',
    topic_id: 'topic-basics',
    description: `
    # Variables and Assignment
    
    In Python, variables are used to store data values. Unlike some other programming languages, 
    Python has no command for declaring a variable. A variable is created the moment you first 
    assign a value to it.
    
    ## Your Task
    
    Complete the \`initialize_variables\` function that creates different types of variables and returns them.
    
    The function should:
    1. Create a string variable named \`name\` with the value "Python"
    2. Create an integer variable named \`age\` with the value 30
    3. Create a floating-point variable named \`height\` with the value 1.75
    4. Create a boolean variable named \`is_programming\` with the value True
    5. Return all four variables in that order (name, age, height, is_programming)
    `,
    initial_code: `def initialize_variables():
    # Create your variables here
    
    
    # Return all four variables
    return name, age, height, is_programming
`,
    solution_code: `def initialize_variables():
    # Create your variables here
    name = "Python"
    age = 30
    height = 1.75
    is_programming = True
    
    # Return all four variables
    return name, age, height, is_programming
`,
    test_cases: [
      {
        input: [],
        expected_output: ["Python", 30, 1.75, true]
      }
    ]
  },
  
  {
    id: 'basic-math-operations',
    title: 'Basic Math Operations',
    difficulty: 'Easy',
    course_id: 'course-1',
    topic_id: 'topic-basics',
    description: `
    # Basic Math Operations
    
    Python supports various mathematical operations that you can use in your code.
    The basic operations include addition (+), subtraction (-), multiplication (*), division (/), 
    and modulus (%).
    
    ## Your Task
    
    Complete the following functions to perform basic math operations:
    
    1. \`add(a, b)\`: Return the sum of a and b
    2. \`subtract(a, b)\`: Return a minus b
    3. \`multiply(a, b)\`: Return a multiplied by b
    4. \`divide(a, b)\`: Return a divided by b
    5. \`modulus(a, b)\`: Return the remainder when a is divided by b
    `,
    initial_code: `def add(a, b):
    # Return the sum of a and b
    pass

def subtract(a, b):
    # Return a minus b
    pass

def multiply(a, b):
    # Return a multiplied by b
    pass

def divide(a, b):
    # Return a divided by b
    pass

def modulus(a, b):
    # Return the remainder when a is divided by b
    pass
`,
    solution_code: `def add(a, b):
    # Return the sum of a and b
    return a + b

def subtract(a, b):
    # Return a minus b
    return a - b

def multiply(a, b):
    # Return a multiplied by b
    return a * b

def divide(a, b):
    # Return a divided by b
    return a / b

def modulus(a, b):
    # Return the remainder when a is divided by b
    return a % b
`,
    test_cases: [
      {
        input: [5, 3],
        expected_output: {
          "add": 8,
          "subtract": 2,
          "multiply": 15,
          "divide": 1.6666666666666667,
          "modulus": 2
        }
      },
      {
        input: [10, 2],
        expected_output: {
          "add": 12,
          "subtract": 8,
          "multiply": 20,
          "divide": 5.0,
          "modulus": 0
        }
      }
    ]
  },
  {
    id: 'conditional-statements',
    title: 'Conditional Statements',
    difficulty: 'Medium',
    course_id: 'course-1',
    topic_id: 'topic-conditionals',
    description: `
    # Conditional Statements
    
    Conditional statements are used to execute different code blocks based on whether a condition is true or false.
    In Python, you can use if, elif (else if), and else statements to create conditional blocks.
    
    ## Your Task
    
    Complete the \`check_number\` function that checks if a number is positive, negative, or zero.
    
    The function should:
    1. Return "Positive" if the number is greater than 0
    2. Return "Negative" if the number is less than 0
    3. Return "Zero" if the number is equal to 0
    `,
    initial_code: `def check_number(number):
    # Check if the number is positive, negative, or zero
    pass
`,
    solution_code: `def check_number(number):
    # Check if the number is positive, negative, or zero
    if number > 0:
        return "Positive"
    elif number < 0:
        return "Negative"
    else:
        return "Zero"
`,
    test_cases: [
      {
        input: [5],
        expected_output: "Positive"
      },
      {
        input: [-3],
        expected_output: "Negative"
      },
      {
        input: [0],
        expected_output: "Zero"
      }
    ]
  },
  {
    id: 'simple-calculator',
    title: 'Simple Calculator',
    difficulty: 'Medium',
    course_id: 'course-1',
    topic_id: 'topic-conditionals',
    description: `
    # Simple Calculator
    
    Create a simple calculator that performs basic arithmetic operations based on user input.
    
    ## Your Task
    
    Complete the \`calculate\` function that takes two numbers and an operation as input and returns the result.
    
    The function should:
    1. Take two numbers (a and b) and an operation (operation) as input
    2. Perform the specified operation (+, -, *, /) on the numbers
    3. Return the result of the operation
    4. If the operation is invalid, return "Invalid operation"
    `,
    initial_code: `def calculate(a, b, operation):
    # Perform the specified operation
    pass
`,
    solution_code: `def calculate(a, b, operation):
    # Perform the specified operation
    if operation == '+':
        return a + b
    elif operation == '-':
        return a - b
    elif operation == '*':
        return a * b
    elif operation == '/':
        if b == 0:
            return "Division by zero"
        return a / b
    else:
        return "Invalid operation"
`,
    test_cases: [
      {
        input: [5, 3, '+'],
        expected_output: 8
      },
      {
        input: [10, 2, '-'],
        expected_output: 8
      },
      {
        input: [4, 6, '*'],
        expected_output: 24
      },
      {
        input: [10, 2, '/'],
        expected_output: 5.0
      },
      {
        input: [5, 3, '%'],
        expected_output: "Invalid operation"
      }
    ]
  }
];
