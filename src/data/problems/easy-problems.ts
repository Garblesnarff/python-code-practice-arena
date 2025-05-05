
import { Problem } from './types';

export const easyProblems: Problem[] = [
  {
    id: "sum_positives",
    title: "Sum of Positive Numbers",
    difficulty: 'Easy',
    description: "Write a function that takes a list of numbers and returns the sum of all positive numbers.",
    signature_hint: "def sum_positives(numbers):",
    examples: [
      { input: "[1, -2, 3, 0]", output: "4" },
      { input: "[-1, -5]", output: "0" }
    ],
    test_cases: [
      { input: [1, -2, 3, 0], expected_output: 4 },
      { input: [-1, -5, -10], expected_output: 0 },
      { input: [2, 4, 6, 8], expected_output: 20 },
      { input: [], expected_output: 0 }
    ],
    starter_code: "def sum_positives(numbers):\n    # Your code here\n    pass",
    solution: "def sum_positives(numbers):\n    # Initialize a variable to store the sum\n    total = 0\n    \n    # Loop through each number in the list\n    for num in numbers:\n        # Check if the number is positive\n        if num > 0:\n            # If positive, add it to our total\n            total = total + num\n    \n    # Return the final sum\n    return total",
    explanation: "This solution uses a simple approach with a for-loop:\n\n1. We first create a variable `total` starting at 0 to keep track of our sum.\n2. Then we go through each number in the input list one by one.\n3. For each number, we check if it's positive (greater than 0).\n4. If the number is positive, we add it to our running total.\n5. Finally, we return the total sum.\n\nThe original solution used a more advanced technique called a 'generator expression' with the built-in `sum()` function: `return sum(num for num in numbers if num > 0)`. This is a more concise way to write the same logic, but it's easier to understand the step-by-step approach when you're first learning Python."
  },
  {
    id: "reverse_string",
    title: "Reverse String",
    difficulty: 'Easy',
    description: "Write a function that takes a string and returns the reverse of that string.",
    signature_hint: "def reverse_string(s):",
    examples: [
      { input: "'hello'", output: "'olleh'" },
      { input: "'python'", output: "'nohtyp'" }
    ],
    test_cases: [
      { input: "hello", expected_output: "olleh" },
      { input: "python", expected_output: "nohtyp" },
      { input: "a", expected_output: "a" },
      { input: "", expected_output: "" }
    ],
    starter_code: "def reverse_string(s):\n    # Your code here\n    pass",
    solution: "def reverse_string(s):\n    # Create an empty string for the result\n    reversed_str = ''\n    \n    # Loop through the string from the end to the beginning\n    for i in range(len(s) - 1, -1, -1):\n        # Add each character to our result string\n        reversed_str = reversed_str + s[i]\n    \n    # Return the reversed string\n    return reversed_str",
    explanation: "This solution reverses a string by building a new string character by character:\n\n1. First, we create an empty string `reversed_str` to store our result.\n2. Next, we use a for loop with the `range()` function to iterate through the string backwards:\n   - `len(s) - 1` is the index of the last character\n   - `-1` is where we want to stop (right before the beginning of the string)\n   - `-1` is the step (moving backwards one character at a time)\n3. For each character, we add it to our result string.\n4. Finally, we return the completed reversed string.\n\nAn even simpler solution in Python uses string slicing with a negative step: `return s[::-1]`. This is a shortcut that says 'start at the end, go to the beginning, moving backward by 1 character' but the loop approach helps you understand what's happening step by step."
  },
  {
    id: "count_vowels",
    title: "Count Vowels",
    difficulty: 'Easy',
    description: "Write a function that takes a string and returns the number of vowels (a, e, i, o, u) in the string. Ignore case sensitivity.",
    signature_hint: "def count_vowels(s):",
    examples: [
      { input: "'hello'", output: "2" },
      { input: "'PYTHON'", output: "1" }
    ],
    test_cases: [
      { input: "hello", expected_output: 2 },
      { input: "PYTHON", expected_output: 1 },
      { input: "aEiOu", expected_output: 5 },
      { input: "xyz", expected_output: 0 },
      { input: "", expected_output: 0 }
    ],
    starter_code: "def count_vowels(s):\n    # Your code here\n    pass",
    solution: "def count_vowels(s):\n    # Convert the string to lowercase\n    s = s.lower()\n    \n    # Define the set of vowels\n    vowels = ['a', 'e', 'i', 'o', 'u']\n    \n    # Initialize a counter for vowels\n    count = 0\n    \n    # Loop through each character in the string\n    for char in s:\n        # Check if the character is a vowel\n        if char in vowels:\n            # Increment the counter\n            count = count + 1\n    \n    # Return the final count\n    return count",
    explanation: "This solution counts the vowels in a string using a straightforward approach:\n\n1. First, we convert the input string to lowercase using `s.lower()` so we don't have to worry about case sensitivity.\n2. We define a list of vowels: 'a', 'e', 'i', 'o', 'u'.\n3. We initialize a counter variable `count` to keep track of how many vowels we find.\n4. We loop through each character in the string.\n5. For each character, we check if it's in our list of vowels.\n6. If it is a vowel, we increment our counter by 1.\n7. Finally, we return the count.\n\nThe original solution used a generator expression with the `sum()` function: `return sum(1 for char in s.lower() if char in 'aeiou')`. This is more concise but does the same thing: for each character that is a vowel, it adds 1 to the total."
  },
  {
    id: "find_max",
    title: "Find Maximum",
    difficulty: 'Easy',
    description: "Write a function that finds the maximum value in a list of numbers. If the list is empty, return None.",
    signature_hint: "def find_max(numbers):",
    examples: [
      { input: "[1, 8, 3, 4]", output: "8" },
      { input: "[-2, -5, -1]", output: "-1" }
    ],
    test_cases: [
      { input: [1, 8, 3, 4], expected_output: 8 },
      { input: [-2, -5, -1], expected_output: -1 },
      { input: [42], expected_output: 42 },
      { input: [], expected_output: null }
    ],
    starter_code: "def find_max(numbers):\n    # Your code here\n    pass",
    solution: "def find_max(numbers):\n    # Check if the list is empty\n    if len(numbers) == 0:\n        return None\n    \n    # Initialize max_value with the first number\n    max_value = numbers[0]\n    \n    # Loop through the rest of the list\n    for num in numbers[1:]:\n        # If we find a bigger number, update max_value\n        if num > max_value:\n            max_value = num\n    \n    # Return the maximum value\n    return max_value",
    explanation: "This solution finds the maximum value in a list using these steps:\n\n1. First, we check if the list is empty using `len(numbers) == 0`. If it is, we return `None`.\n2. If the list isn't empty, we initialize `max_value` with the first number in the list.\n3. Then we loop through the rest of the numbers in the list (starting from index 1).\n4. For each number, we compare it with our current `max_value`.\n5. If we find a bigger number, we update `max_value` to this new number.\n6. At the end, `max_value` will contain the largest number in the list, which we return.\n\nPython has a built-in `max()` function that can do this more easily: `return max(numbers) if numbers else None`. However, it's important to understand the basic approach first before using the built-in function."
  },
  {
    id: "is_palindrome",
    title: "Is Palindrome",
    difficulty: 'Easy',
    description: "Write a function that checks if a given string is a palindrome (reads the same forward and backward). Ignore case and non-alphanumeric characters.",
    signature_hint: "def is_palindrome(s):",
    examples: [
      { input: "'A man, a plan, a canal: Panama'", output: "True" },
      { input: "'race a car'", output: "False" }
    ],
    test_cases: [
      { input: "A man, a plan, a canal: Panama", expected_output: true },
      { input: "race a car", expected_output: false },
      { input: "Was it a car or a cat I saw?", expected_output: true },
      { input: "hello", expected_output: false },
      { input: "", expected_output: true }
    ],
    starter_code: "def is_palindrome(s):\n    # Your code here\n    pass",
    solution: "def is_palindrome(s):\n    # Remove non-alphanumeric characters and convert to lowercase\n    clean_s = ''\n    for char in s:\n        if char.isalnum():\n            clean_s = clean_s + char.lower()\n    \n    # Check if the cleaned string reads the same forwards and backwards\n    # Method 1: Compare the string with its reverse\n    return clean_s == clean_s[::-1]",
    explanation: "This solution checks if a string is a palindrome in two main steps:\n\n1. First, we clean the string by:\n   - Removing all non-alphanumeric characters (like spaces, punctuation)\n   - Converting all letters to lowercase\n   - We do this by iterating through each character and only keeping the ones that are letters or numbers using `isalnum()`\n\n2. Then, we check if the cleaned string is a palindrome by:\n   - Comparing the string with its reverse using string slicing `clean_s[::-1]`\n   - If they're the same, the string is a palindrome\n\nAlternatively, we could have done the palindrome check by comparing characters from both ends and moving inward, but this approach is simpler in Python."
  }
];
