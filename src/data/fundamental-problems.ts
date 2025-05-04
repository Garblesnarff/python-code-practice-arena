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
    explanation: "This function uses the comparison operator `<` to compare two numbers and returns the smaller one. It demonstrates the use of comparison operators and conditional statements. The function checks if `a` is less than `b` and returns `a` if true, otherwise it returns `b`. Python also has a built-in `min()` function that can simplify this: `return min(a, b)`"
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
  },
  {
    id: "sum_digits",
    title: "Sum of All Digits",
    difficulty: 'Easy',
    description: "Write a function that calculates the sum of all digits in a number of any length. This introduces you to string conversion and iteration through characters.",
    signature_hint: "def sum_digits(n):",
    examples: [
      { input: "123", output: "6" },
      { input: "9045", output: "18" }
    ],
    test_cases: [
      { input: [123], expected_output: 6 },
      { input: [9045], expected_output: 18 },
      { input: [0], expected_output: 0 },
      { input: [999], expected_output: 27 }
    ],
    starter_code: "def sum_digits(n):\n    # Your code here\n    pass",
    solution: "def sum_digits(n):\n    # Convert the number to string\n    n_str = str(n)\n    \n    # Initialize sum\n    total = 0\n    \n    # Iterate through each character in the string\n    for digit in n_str:\n        # Convert the character back to integer and add to total\n        total = total + int(digit)\n    \n    return total",
    explanation: "This solution calculates the sum of all digits in a number using these steps:\n\n1. First, we convert the input number to a string using the `str()` function to be able to access each digit.\n2. We initialize a variable `total` to 0 to keep track of the running sum.\n3. We then iterate through each character in the string representation of the number.\n4. For each character, we convert it back to an integer using the `int()` function and add it to our running total.\n5. Finally, we return the calculated total.\n\nThis approach showcases the common pattern of converting between different data types to solve a problem more easily. In Python, converting numbers to strings allows us to easily process each digit separately."
  },
  {
    id: "count_matching",
    title: "Count Matching Elements",
    difficulty: 'Easy',
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
    difficulty: 'Easy',
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
    id: "product_digits",
    title: "Product of Digits",
    difficulty: 'Easy',
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
  }
];
