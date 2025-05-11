import { Problem } from './types';

export const mediumProblems = [
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
  },
  {
    id: "count_matching",
    title: "Count Matching Elements",
    difficulty: 'Medium',
    description: "Write a function that counts how many elements appear in both of two lists. This introduces you to set operations in Python.",
    signature_hint: "def count_matching(list1, list2):",
    examples: [
      { input: "[1, 2, 3, 4], [3, 4, 5, 6]", output: "2" },
      { input: "[1, 2, 3], [4, 5, 6]", output: "0" }
    ],
    test_cases: [
      { input: [[1, 2, 3, 4], [3, 4, 5, 6]], expected_output: 2 },
      { input: [[1, 2, 3], [4, 5, 6]], expected_output: 0 },
      { input: [[1, 1, 2, 2], [1, 2, 3]], expected_output: 2 },
      { input: [[], [1, 2, 3]], expected_output: 0 }
    ],
    starter_code: "def count_matching(list1, list2):\n    # Your code here\n    pass",
    solution: "def count_matching(list1, list2):\n    # Convert lists to sets\n    set1 = set(list1)\n    set2 = set(list2)\n    \n    # Find the intersection of the two sets\n    matching_elements = set1.intersection(set2)\n    \n    # Return the number of elements in the intersection\n    return len(matching_elements)\n\n    # Alternative one-line solution:\n    # return len(set(list1) & set(list2))",
    explanation: "This solution counts matching elements between two lists using set operations:\n\n1. First, we convert both lists to sets using the `set()` constructor. This removes duplicates and allows for efficient comparison.\n2. Then, we find the intersection of the two sets using the `.intersection()` method, which gives us a new set containing only the elements that appear in both sets.\n3. Finally, we return the length of this intersection set, which is the count of matching elements.\n\nThe alternative one-line solution uses the `&` operator, which is the set intersection operator in Python. Both approaches have the same result, but the one-line version is more concise.\n\nThis problem demonstrates the power of Python's set operations for comparing collections of items without having to use nested loops, which would be less efficient."
  },
  {
    id: "format_phone_number",
    title: "Format Phone Number",
    difficulty: 'Medium',
    description: "Write a function that formats a list of 10 digits into a phone number string: (XXX) XXX-XXXX. This introduces you to string formatting and list manipulation in Python.",
    signature_hint: "def format_phone_number(numbers):",
    examples: [
      { input: "[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]", output: "\"(123) 456-7890\"" }
    ],
    test_cases: [
      { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]], expected_output: "(123) 456-7890" },
      { input: [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]], expected_output: "(987) 654-3210" }
    ],
    starter_code: "def format_phone_number(numbers):\n    # Your code here\n    pass",
    solution: "def format_phone_number(numbers):\n    # Convert all integers in the list to strings\n    digits = [str(num) for num in numbers]\n    \n    # Join all digits into a single string\n    digits_str = ''.join(digits)\n    \n    # Format the string using slicing\n    formatted = '(' + digits_str[0:3] + ') ' + digits_str[3:6] + '-' + digits_str[6:10]\n    \n    return formatted",
    explanation: "This solution formats a list of 10 digits into a phone number string using these steps:\n\n1. First, we convert each integer in the input list to a string using a list comprehension and the `str()` function.\n2. Then, we join all these digit strings into a single string using the `join()` method with an empty string as the separator.\n3. Finally, we format the string by concatenating parts with the appropriate phone number formatting:\n   - We add an opening parenthesis, then take characters 0-2 (the first three digits), then add a closing parenthesis and a space.\n   - Next, we take characters 3-5 (the next three digits), then add a hyphen.\n   - Finally, we take characters 6-9 (the last four digits).\n\nThis problem demonstrates string manipulation, list processing, and string slicing in Python. It shows how to convert between different data types and build formatted strings from parts."
  },
  {
    id: "find_missing_number",
    title: "Find Missing Number",
    difficulty: 'Medium',
    description: "Write a function that finds the missing number in a sequence from 0 to n. The input list will contain n distinct numbers in the range [0, n], with exactly one number missing. This introduces you to mathematical formulas in programming.",
    signature_hint: "def find_missing_number(nums):",
    examples: [
      { input: "[3, 0, 1]", output: "2" },
      { input: "[9, 6, 4, 2, 3, 5, 7, 0, 1]", output: "8" }
    ],
    test_cases: [
      { input: [[3, 0, 1]], expected_output: 2 },
      { input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected_output: 8 },
      { input: [[0, 1]], expected_output: 2 }
    ],
    starter_code: "def find_missing_number(nums):\n    # Your code here\n    pass",
    solution: "def find_missing_number(nums):\n    # Get the length of the list\n    # This will be n (the expected range is 0 to n)\n    n = len(nums)\n    \n    # Calculate the expected sum of numbers from 0 to n\n    # using the formula: n * (n + 1) / 2\n    expected_sum = n * (n + 1) // 2\n    \n    # Calculate the actual sum of the input array\n    actual_sum = sum(nums)\n    \n    # The difference between the expected and actual sum is the missing number\n    missing_number = expected_sum - actual_sum\n    \n    return missing_number",
    explanation: "This solution finds a missing number using a mathematical approach:\n\n1. First, we determine that the expected range is from 0 to n, where n is the length of the input array. Since exactly one number is missing, the array has n elements, and the complete sequence would have n+1 elements.\n2. We calculate the sum of all numbers from 0 to n using the mathematical formula: n * (n + 1) / 2. This gives us the expected sum of the complete sequence.\n3. Then, we calculate the actual sum of the array using the built-in `sum()` function.\n4. The difference between these two sums must be the missing number.\n\nThis is an elegant solution that avoids having to sort the array or check each number individually, resulting in O(n) time complexity. It demonstrates how mathematical insights can lead to efficient algorithms."
  },
  {
    id: "is_rotation",
    title: "Is String Rotation",
    difficulty: 'Medium',
    description: "Write a function that determines if one string is a rotation of another string. A rotation means moving characters from the beginning of the string to the end without changing the characters themselves.",
    signature_hint: "def is_rotation(str1, str2):",
    examples: [
      { input: "\"waterbottle\", \"erbottlewat\"", output: "True" },
      { input: "\"hello\", \"olleh\"", output: "False" }
    ],
    test_cases: [
      { input: ["waterbottle", "erbottlewat"], expected_output: true },
      { input: ["hello", "olleh"], expected_output: false },
      { input: ["", ""], expected_output: true },
      { input: ["abc", "cab"], expected_output: true }
    ],
    starter_code: "def is_rotation(str1, str2):\n    # Your code here\n    pass",
    solution: "def is_rotation(str1, str2):\n    # Check if both strings are of the same length\n    # If not, one cannot be a rotation of the other\n    if len(str1) != len(str2):\n        return False\n    \n    # If both strings are empty, return True\n    # (this is a special case)\n    if len(str1) == 0:\n        return True\n    \n    # Concatenate str1 with itself\n    # If str2 is a rotation of str1, it will be a substring of this concatenation\n    concatenated = str1 + str1\n    \n    # Check if str2 is a substring of the concatenation\n    return str2 in concatenated",
    explanation: "This solution determines if one string is a rotation of another using a clever approach:\n\n1. First, we check if the two strings have the same length. If not, one cannot be a rotation of the other.\n2. We handle the special case where both strings are empty (we consider an empty string to be a rotation of itself).\n3. The key insight is that if str2 is a rotation of str1, then str2 must be a substring of str1 + str1 (str1 concatenated with itself).\n   - For example, if str1 = \"waterbottle\" and str2 = \"erbottlewat\", then str1 + str1 = \"waterbottlewaterbottle\", and we can find \"erbottlewat\" within this concatenated string.\n\n4. We use Python's `in` operator to check if str2 is a substring of the concatenated string.\n\nThis elegant solution avoids having to check all possible rotation points manually, resulting in more readable and efficient code."
  },
  {
    id: "first_non_repeating_character",
    title: "First Non-Repeating Character",
    difficulty: 'Medium',
    description: "Write a function that finds the index of the first non-repeating character in a string. If there are no non-repeating characters, return -1.",
    signature_hint: "def first_non_repeating_character(s):",
    examples: [
      { input: "\"abacabad\"", output: "4 (character 'c')" },
      { input: "\"abcdefghijklmnopqrstuvwxyziflskecznslkjfabe\"", output: "25 (character 'q')" }
    ],
    test_cases: [
      { input: ["abacabad"], expected_output: 4 },
      { input: ["abcdefghijklmnopqrstuvwxyziflskecznslkjfabe"], expected_output: 25 },
      { input: ["aabb"], expected_output: -1 },
      { input: [""], expected_output: -1 }
    ],
    starter_code: "def first_non_repeating_character(s):\n    # Your code here\n    pass",
    solution: "def first_non_repeating_character(s):\n    # Create a dictionary to store character counts\n    char_counts = {}\n    \n    # First pass: Count occurrences of each character\n    for char in s:\n        if char in char_counts:\n            char_counts[char] += 1\n        else:\n            char_counts[char] = 1\n    \n    # Second pass: Find the first character with count 1\n    for i, char in enumerate(s):\n        if char_counts[char] == 1:\n            return i\n    \n    # If no non-repeating character is found, return -1\n    return -1",
    explanation: "This solution finds the index of the first non-repeating character in a string using a two-pass approach:\n\n1. We create a dictionary to keep track of how many times each character appears in the string.\n2. In the first pass, we iterate through the string and count the occurrences of each character:\n   - If the character is already in the dictionary, we increment its count.\n   - If not, we add it to the dictionary with a count of 1.\n3. In the second pass, we iterate through the string again, but this time we check the count of each character in our dictionary:\n   - When we find the first character with a count of 1, we return its index.\n   - We use the `enumerate()` function to get both the character and its index in the string.\n4. If we go through the entire string without finding a non-repeating character, we return -1.\n\nThis approach has O(n) time complexity where n is the length of the string, as we need to scan the string twice. This is more efficient than trying to check each character against all others, which would be O(n²)."
  },
  {
    id: "merge_sorted_lists",
    title: "Merge Sorted Lists",
    difficulty: 'Medium',
    description: "Write a function that merges two sorted lists into a single sorted list. The input lists will be sorted in ascending order, and the output should also be sorted in ascending order.",
    signature_hint: "def merge_sorted_lists(list1, list2):",
    examples: [
      { input: "[1, 3, 5], [2, 4, 6]", output: "[1, 2, 3, 4, 5, 6]" },
      { input: "[1, 1, 3], [2, 2]", output: "[1, 1, 2, 2, 3]" }
    ],
    test_cases: [
      { input: [[1, 3, 5], [2, 4, 6]], expected_output: [1, 2, 3, 4, 5, 6] },
      { input: [[1, 1, 3], [2, 2]], expected_output: [1, 1, 2, 2, 3] },
      { input: [[], [1, 2, 3]], expected_output: [1, 2, 3] },
      { input: [[1, 2, 3], []], expected_output: [1, 2, 3] }
    ],
    starter_code: "def merge_sorted_lists(list1, list2):\n    # Your code here\n    pass",
    solution: "def merge_sorted_lists(list1, list2):\n    # Initialize indexes for both lists\n    i = 0  # index for list1\n    j = 0  # index for list2\n    \n    # Initialize result list\n    merged = []\n    \n    # Compare elements from both lists and add the smaller one to result\n    while i < len(list1) and j < len(list2):\n        if list1[i] <= list2[j]:\n            merged.append(list1[i])\n            i += 1\n        else:\n            merged.append(list2[j])\n            j += 1\n    \n    # Add remaining elements from list1, if any\n    while i < len(list1):\n        merged.append(list1[i])\n        i += 1\n    \n    # Add remaining elements from list2, if any\n    while j < len(list2):\n        merged.append(list2[j])\n        j += 1\n    \n    return merged",
    explanation: "This solution merges two sorted lists using the classic two-pointer approach:\n\n1. We initialize two pointers (i and j) to track our position in each input list, and an empty list to store the merged result.\n2. While we still have elements in both lists to process (i < len(list1) and j < len(list2)):\n   - We compare the current elements from both lists.\n   - We add the smaller element to our merged list and increment the corresponding pointer.\n3. After the main loop, we might still have remaining elements in either list1 or list2, so we have two additional loops to add those remaining elements to the merged list.\n4. Finally, we return the merged list, which will be sorted in ascending order.\n\nThis algorithm has O(n + m) time complexity, where n and m are the lengths of the input lists. It's efficient because we only need to traverse each list once, and we make use of the fact that the input lists are already sorted."
  },
  {
    id: "product_digits",
    title: "Product of Digits",
    difficulty: 'Medium',
    description: "Write a function that calculates the product of all digits in a number. This introduces you to string conversion and accumulating values in a loop.",
    signature_hint: "def product_digits(n):",
    examples: [
      { input: "123", output: "6" },
      { input: "405", output: "0" }
    ],
    test_cases: [
      { input: [123], expected_output: 6 },
      { input: [405], expected_output: 0 },
      { input: [999], expected_output: 729 },
      { input: [0], expected_output: 0 }
    ],
    starter_code: "def product_digits(n):\n    # Your code here\n    pass",
    solution: "def product_digits(n):\n    # Convert the number to string\n    n_str = str(n)\n    \n    # Initialize product to 1\n    product = 1\n    \n    # Iterate through each character in the string\n    for digit in n_str:\n        # Convert the character back to integer and multiply with product\n        product = product * int(digit)\n    \n    # Return the final product\n    return product",
    explanation: "This solution calculates the product of all digits in a number using these steps:\n\n1. First, we convert the input number to a string using the `str()` function to be able to access each digit.\n2. We initialize a variable `product` to 1 (the multiplicative identity) to keep track of the running product.\n3. We then iterate through each character in the string representation of the number.\n4. For each character, we convert it back to an integer using the `int()` function and multiply it with our running product.\n5. Finally, we return the calculated product.\n\nNote that if any of the digits is 0, the entire product will be 0, as shown in the second example. This is an important edge case to consider.\n\nThis problem is similar to the \"Sum of All Digits\" problem but uses multiplication instead of addition. It demonstrates type conversion and accumulation patterns in Python."
  }
] as Problem[];
