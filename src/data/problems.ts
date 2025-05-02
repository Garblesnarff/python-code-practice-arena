
export interface Example {
  input: string;
  output: string;
}

export interface TestCase {
  input: any;
  expected_output: any;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  signature_hint: string;
  examples: Example[];
  test_cases: TestCase[];
  starter_code?: string;
  solution?: string;
  explanation?: string;
}

export const problems: Problem[] = [
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
  },
  {
    id: "count_elements",
    title: "Count Elements",
    difficulty: 'Medium',
    description: "Write a function that takes a list and returns a dictionary with the count of each element in the list.",
    signature_hint: "def count_elements(items):",
    examples: [
      { input: "['a', 'b', 'a', 'c', 'b', 'a']", output: "{'a': 3, 'b': 2, 'c': 1}" },
      { input: "[1, 2, 2, 3, 1, 1]", output: "{1: 3, 2: 2, 3: 1}" }
    ],
    test_cases: [
      { input: ['a', 'b', 'a', 'c', 'b', 'a'], expected_output: {'a': 3, 'b': 2, 'c': 1} },
      { input: [1, 2, 2, 3, 1, 1], expected_output: {1: 3, 2: 2, 3: 1} },
      { input: [true, false, true], expected_output: {true: 2, false: 1} },
      { input: [], expected_output: {} }
    ],
    starter_code: "def count_elements(items):\n    # Your code here\n    pass",
    solution: "def count_elements(items):\n    # Create an empty dictionary to store counts\n    counts = {}\n    \n    # Loop through each item in the list\n    for item in items:\n        # If item already exists in dictionary, increment its count\n        if item in counts:\n            counts[item] = counts[item] + 1\n        # Otherwise, add it with count 1\n        else:\n            counts[item] = 1\n    \n    # Return the completed dictionary\n    return counts",
    explanation: "This solution counts the occurrences of each element in a list:\n\n1. First, we create an empty dictionary `counts` to store our results.\n2. Then we loop through each item in the input list.\n3. For each item:\n   - We check if the item is already in our dictionary using `if item in counts`.\n   - If it is, we increment its count by 1.\n   - If not, we add it to the dictionary with a count of 1.\n4. Finally, we return the completed dictionary with all the counts.\n\nThis approach is straightforward and shows the logic clearly. Python also has a built-in class called `collections.Counter` that could do this in one line, but it's important to understand the manual implementation first."
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    difficulty: 'Medium',
    description: "Write a function that returns a list of strings for numbers from 1 to n. For multiples of 3, use 'Fizz' instead of the number. For multiples of 5, use 'Buzz'. For numbers that are multiples of both 3 and 5, use 'FizzBuzz'.",
    signature_hint: "def fizzbuzz(n):",
    examples: [
      { input: "5", output: "['1', '2', 'Fizz', '4', 'Buzz']" },
      { input: "15", output: "['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']" }
    ],
    test_cases: [
      { input: 5, expected_output: ['1', '2', 'Fizz', '4', 'Buzz'] },
      { input: 15, expected_output: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'] },
      { input: 0, expected_output: [] }
    ],
    starter_code: "def fizzbuzz(n):\n    # Your code here\n    pass",
    solution: "def fizzbuzz(n):\n    # Create an empty list to store results\n    result = []\n    \n    # Loop through numbers 1 to n\n    for i in range(1, n+1):\n        # Check conditions in specific order\n        # First check if divisible by both 3 and 5\n        if i % 3 == 0 and i % 5 == 0:\n            result.append('FizzBuzz')\n        # Then check if divisible by 3 only\n        elif i % 3 == 0:\n            result.append('Fizz')\n        # Then check if divisible by 5 only\n        elif i % 5 == 0:\n            result.append('Buzz')\n        # If none of the above, use the number as a string\n        else:\n            result.append(str(i))\n    \n    # Return the completed list\n    return result",
    explanation: "This solution implements the classic FizzBuzz problem:\n\n1. First, we create an empty list `result` to store our answers.\n2. We use a for loop to go through numbers 1 to n using `range(1, n+1)` (since range stops before the second number).\n3. For each number, we apply these rules in order:\n   - If the number is divisible by both 3 and 5 (using modulo operator `%`), add 'FizzBuzz' to the list\n   - Otherwise, if it's divisible by 3, add 'Fizz'\n   - Otherwise, if it's divisible by 5, add 'Buzz'\n   - Otherwise, add the number itself (converted to string using `str()`)\n4. Finally, we return the completed list.\n\nThe order of the conditions is important! We need to check for 'FizzBuzz' first, before checking for 'Fizz' or 'Buzz' individually."
  },
  {
    id: "two_sum",
    title: "Two Sum",
    difficulty: 'Medium',
    description: "Write a function that takes a list of integers and a target number. Return the indices of two numbers such that they add up to the target. Assume there is exactly one solution, and you cannot use the same element twice.",
    signature_hint: "def two_sum(nums, target):",
    examples: [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]" },
      { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]" }
    ],
    test_cases: [
      { input: [[2, 7, 11, 15], 9], expected_output: [0, 1] },
      { input: [[3, 2, 4], 6], expected_output: [1, 2] },
      { input: [[3, 3], 6], expected_output: [0, 1] }
    ],
    starter_code: "def two_sum(nums, target):\n    # Your code here\n    pass",
    solution: "def two_sum(nums, target):\n    # Create a dictionary to store number -> index mapping\n    seen = {}\n    \n    # Loop through the list with index\n    for i, num in enumerate(nums):\n        # Calculate what number we need to find\n        complement = target - num\n        \n        # If we've seen the complement before, we found our answer\n        if complement in seen:\n            # Return the indices of the two numbers\n            return [seen[complement], i]\n        \n        # Otherwise, store this number and its index\n        seen[num] = i\n    \n    # If no solution is found (though the problem states there is always one)\n    return []",
    explanation: "This solution uses a dictionary (hash map) to efficiently find the answer:\n\n1. We create an empty dictionary called `seen` to keep track of numbers we've already processed.\n2. We loop through the list using `enumerate(nums)`, which gives us both the index `i` and the value `num`.\n3. For each number, we:\n   - Calculate the 'complement' (the value needed to reach the target) using `target - num`\n   - Check if this complement is already in our dictionary of seen numbers\n   - If it is, we've found our answer! Return both indices: [seen[complement], i]\n   - If not, we add the current number to our dictionary with its index\n\nThis approach only requires us to go through the list once, making it more efficient than checking every possible pair of numbers. It has O(n) time complexity versus the O(n²) of a nested loop approach."
  }
];
