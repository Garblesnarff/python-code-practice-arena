
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
    solution: "def sum_positives(numbers):\n    return sum(num for num in numbers if num > 0)",
    explanation: "This solution uses a generator expression with the `sum()` function to add up only the positive numbers from the input list. The expression `num for num in numbers if num > 0` creates an iterator over all numbers in the list that are greater than zero."
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
    solution: "def reverse_string(s):\n    return s[::-1]",
    explanation: "This solution uses string slicing with a step of -1 to reverse the string. The syntax `s[::-1]` means start from the end of the string and move backwards to the beginning."
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
    solution: "def count_vowels(s):\n    return sum(1 for char in s.lower() if char in 'aeiou')",
    explanation: "This solution first converts the string to lowercase using `s.lower()`. Then it uses a generator expression to count each character that is in the vowel set 'aeiou'. The `sum()` function adds up all the 1s for each vowel found."
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
    solution: "def find_max(numbers):\n    if not numbers:\n        return None\n    return max(numbers)",
    explanation: "This solution first checks if the list is empty using `if not numbers:`. If it's empty, it returns None. Otherwise, it uses the built-in `max()` function to find the maximum value in the list."
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
    solution: "def is_palindrome(s):\n    # Remove non-alphanumeric characters and convert to lowercase\n    clean = ''.join(c for c in s if c.isalnum()).lower()\n    # Check if the string reads the same forwards and backwards\n    return clean == clean[::-1]",
    explanation: "This solution has two steps: 1) Clean the string by removing all non-alphanumeric characters and converting to lowercase, 2) Check if the cleaned string is equal to its reverse. The cleaning uses a generator expression to keep only alphanumeric characters (`c.isalnum()`), then joins them together and converts to lowercase."
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
    solution: "def count_elements(items):\n    counts = {}\n    for item in items:\n        if item in counts:\n            counts[item] += 1\n        else:\n            counts[item] = 1\n    return counts",
    explanation: "This solution creates an empty dictionary and then iterates through each item in the list. For each item, it checks if it's already in the dictionary. If it is, it increments its count by 1. If not, it adds the item to the dictionary with a count of 1. You could also use the `collections.Counter` class in Python, but this solution shows the manual implementation."
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
    solution: "def fizzbuzz(n):\n    result = []\n    for i in range(1, n+1):\n        if i % 3 == 0 and i % 5 == 0:\n            result.append('FizzBuzz')\n        elif i % 3 == 0:\n            result.append('Fizz')\n        elif i % 5 == 0:\n            result.append('Buzz')\n        else:\n            result.append(str(i))\n    return result",
    explanation: "This solution uses a loop to iterate through numbers 1 to n. For each number, it checks if it's divisible by both 3 and 5 (using the modulo operator %), then if it's divisible by 3, then if it's divisible by 5. Based on these conditions, it appends the appropriate string to the result list. For non-special numbers, it converts the number to a string using `str(i)`."
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
    solution: "def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []  # No solution found",
    explanation: "This solution uses a dictionary called `seen` to keep track of the numbers we've already processed and their indices. For each number, we calculate its complement (the value needed to reach the target). If the complement is already in our seen dictionary, we've found our solution and return both indices. If not, we add the current number and its index to the dictionary and continue."
  }
];
