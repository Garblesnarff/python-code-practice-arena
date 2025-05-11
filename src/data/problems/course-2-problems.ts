import { Problem } from './types';

// Course 2: Learning Simple Data Structures in Python

// Problem Set A: Lists
export const listProblems: Problem[] = [
  {
    id: 'c2-lists-basics',
    title: 'List Basics',
    description: 'Create a function that performs basic list operations (append, remove, insert).',
    difficulty: 'Easy',
    starter_code: 'def append_element(lst, element):\n    # Add the element to the end of the list\n    # Return the modified list\n    pass\n\ndef remove_element(lst, element):\n    # Remove the first occurrence of element from the list\n    # If element is not in list, return the original list\n    # Return the modified list\n    pass\n\ndef insert_at_position(lst, element, position):\n    # Insert element at the specified position\n    # If position is out of range, insert at the end\n    # Return the modified list\n    pass',
    solution_code: 'def append_element(lst, element):\n    lst.append(element)\n    return lst\n\ndef remove_element(lst, element):\n    if element in lst:\n        lst.remove(element)\n    return lst\n\ndef insert_at_position(lst, element, position):\n    try:\n        lst.insert(position, element)\n    except IndexError:\n        lst.append(element)\n    return lst',
    test_cases: [
      {
        input: [[1, 2, 3], 4, 2],
        expected_output: {
          "append": [1, 2, 3, 4],
          "remove": [1, 3],
          "insert": [1, 2, 4, 3]
        },
      },
      {
        input: [[], 1, 0],
        expected_output: {
          "append": [1],
          "remove": [],
          "insert": [1]
        },
      },
      {
        input: [[5, 5, 5], 5, 1],
        expected_output: {
          "append": [5, 5, 5, 5],
          "remove": [5, 5],
          "insert": [5, 5, 5, 5]
        },
      }
    ],
    examples: [
      {
        input: "[1, 2, 3], 4, 2",
        output: "append: [1, 2, 3, 4], remove: [1, 3], insert: [1, 2, 4, 3]",
      }
    ],
    hints: [
      'Use list.append() to add an element to the end of a list',
      'Use list.remove() to remove the first occurrence of an element',
      'Use list.insert() to add an element at a specific position'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(1)',
    course_id: 'course-2',
    topic_id: 'topic-lists',
  },
  {
    id: 'c2-lists-indexing',
    title: 'List Indexing and Slicing',
    description: 'Implement functions that retrieve elements using different indexing and slicing patterns.',
    difficulty: 'Easy',
    starter_code: 'def get_first_element(lst):\n    # Return the first element of the list\n    # Return None if list is empty\n    pass\n\ndef get_last_element(lst):\n    # Return the last element of the list\n    # Return None if list is empty\n    pass\n\ndef get_slice(lst, start, end):\n    # Return a slice of the list from start to end-1\n    # If the parameters are out of range, return as much as possible\n    pass\n\ndef get_reversed_list(lst):\n    # Return the list in reverse order\n    pass',
    solution_code: 'def get_first_element(lst):\n    if not lst:\n        return None\n    return lst[0]\n\ndef get_last_element(lst):\n    if not lst:\n        return None\n    return lst[-1]\n\ndef get_slice(lst, start, end):\n    return lst[start:end]\n\ndef get_reversed_list(lst):\n    return lst[::-1]',
    test_cases: [
      {
        input: [[1, 2, 3, 4, 5], 1, 4],
        expected_output: {
          "first": 1,
          "last": 5,
          "slice": [2, 3, 4],
          "reversed": [5, 4, 3, 2, 1]
        },
      },
      {
        input: [[], 0, 0],
        expected_output: {
          "first": null,
          "last": null,
          "slice": [],
          "reversed": []
        },
      },
      {
        input: [[99], 0, 10],
        expected_output: {
          "first": 99,
          "last": 99,
          "slice": [99],
          "reversed": [99]
        },
      }
    ],
    examples: [
      {
        input: "[1, 2, 3, 4, 5], 1, 4",
        output: "first: 1, last: 5, slice: [2, 3, 4], reversed: [5, 4, 3, 2, 1]",
      }
    ],
    hints: [
      'Use lst[0] to get the first element and lst[-1] to get the last element',
      'Use lst[start:end] for slicing',
      'Use lst[::-1] for a reversed copy of the list'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-lists',
  },
  {
    id: 'c2-lists-comprehensions',
    title: 'List Comprehensions',
    description: 'Convert traditional for loops to list comprehensions.',
    difficulty: 'Medium',
    starter_code: 'def squares(numbers):\n    # Return a list of squares of the numbers\n    # Use a list comprehension\n    pass\n\ndef evens_only(numbers):\n    # Return a list of only the even numbers\n    # Use a list comprehension\n    pass\n\ndef double_positives(numbers):\n    # Double each positive number (>0) and keep negative numbers as they are\n    # Use a list comprehension\n    pass',
    solution_code: 'def squares(numbers):\n    return [x**2 for x in numbers]\n\ndef evens_only(numbers):\n    return [x for x in numbers if x % 2 == 0]\n\ndef double_positives(numbers):\n    return [x*2 if x > 0 else x for x in numbers]',
    test_cases: [
      {
        input: [[1, 2, 3, 4, 5]],
        expected_output: {
          "squares": [1, 4, 9, 16, 25],
          "evens": [2, 4],
          "double_positives": [2, 4, 6, 8, 10]
        },
      },
      {
        input: [[0, -1, -2, 3, -4]],
        expected_output: {
          "squares": [0, 1, 4, 9, 16],
          "evens": [0, -2, -4],
          "double_positives": [0, -1, -2, 6, -4]
        },
      }
    ],
    examples: [
      {
        input: "[1, 2, 3, 4, 5]",
        output: "squares: [1, 4, 9, 16, 25], evens: [2, 4], double_positives: [2, 4, 6, 8, 10]",
      }
    ],
    hints: [
      'List comprehension syntax: [expression for item in list]',
      'For filtering: [expression for item in list if condition]',
      'For conditionals: [expr1 if condition else expr2 for item in list]'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-lists',
  },
  {
    id: 'c2-lists-nested',
    title: 'Nested Lists',
    description: 'Create functions to manipulate a matrix represented as a list of lists.',
    difficulty: 'Medium',
    starter_code: 'def get_element(matrix, row, col):\n    # Return the element at the given row and column\n    # Return None if indices are out of range\n    pass\n\ndef get_row(matrix, row):\n    # Return the entire row at the given index\n    # Return None if index is out of range\n    pass\n\ndef get_column(matrix, col):\n    # Return the entire column at the given index as a list\n    # Return None if index is out of range\n    pass\n\ndef diagonal_sum(matrix):\n    # Return the sum of elements on the main diagonal (top-left to bottom-right)\n    # Assume the matrix is square (same number of rows and columns)\n    # Return 0 if matrix is empty\n    pass',
    solution_code: 'def get_element(matrix, row, col):\n    try:\n        return matrix[row][col]\n    except (IndexError, TypeError):\n        return None\n\ndef get_row(matrix, row):\n    try:\n        return matrix[row]\n    except (IndexError, TypeError):\n        return None\n\ndef get_column(matrix, col):\n    try:\n        return [row[col] for row in matrix]\n    except (IndexError, TypeError):\n        return None\n\ndef diagonal_sum(matrix):\n    if not matrix:\n        return 0\n    total = 0\n    for i in range(min(len(matrix), len(matrix[0]))):\n        total += matrix[i][i]\n    return total',
    test_cases: [
      {
        input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1, 1],
        expected_output: {
          "element": 5,
          "row": [4, 5, 6],
          "column": [2, 5, 8],
          "diagonal": 15
        },
      },
      {
        input: [[[1, 2], [3, 4]], 0, 1],
        expected_output: {
          "element": 2,
          "row": [1, 2],
          "column": [2, 4],
          "diagonal": 5
        },
      },
      {
        input: [[], 0, 0],
        expected_output: {
          "element": null,
          "row": null,
          "column": null,
          "diagonal": 0
        },
      }
    ],
    examples: [
      {
        input: "[[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1, 1",
        output: "element: 5, row: [4, 5, 6], column: [2, 5, 8], diagonal: 15",
      }
    ],
    hints: [
      'Access elements in a nested list with matrix[row][col]',
      'Use list comprehension to extract a column',
      'Handle out-of-bounds indices with try/except',
      'For the diagonal, the row and column indices are the same'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-lists',
  },
  {
    id: 'c2-lists-methods',
    title: 'List Methods',
    description: 'Implement functions that use sorted(), reverse(), and other list methods.',
    difficulty: 'Easy',
    starter_code: 'def custom_sort(lst):\n    # Return a new sorted list in ascending order\n    # Do not modify the original list\n    pass\n\ndef custom_sort_descending(lst):\n    # Return a new sorted list in descending order\n    # Do not modify the original list\n    pass\n\ndef custom_reverse(lst):\n    # Return a new list that is the reverse of the input list\n    # Do not modify the original list\n    pass\n\ndef count_occurrences(lst, element):\n    # Count how many times element appears in the list\n    pass',
    solution_code: 'def custom_sort(lst):\n    return sorted(lst)\n\ndef custom_sort_descending(lst):\n    return sorted(lst, reverse=True)\n\ndef custom_reverse(lst):\n    return list(reversed(lst))\n\ndef count_occurrences(lst, element):\n    return lst.count(element)',
    test_cases: [
      {
        input: [[5, 2, 8, 1, 3], 2],
        expected_output: {
          "sort": [1, 2, 3, 5, 8],
          "sort_desc": [8, 5, 3, 2, 1],
          "reverse": [3, 1, 8, 2, 5],
          "count": 1
        },
      },
      {
        input: [[3, 3, 3, 3], 3],
        expected_output: {
          "sort": [3, 3, 3, 3],
          "sort_desc": [3, 3, 3, 3],
          "reverse": [3, 3, 3, 3],
          "count": 4
        },
      },
      {
        input: [[], 1],
        expected_output: {
          "sort": [],
          "sort_desc": [],
          "reverse": [],
          "count": 0
        },
      }
    ],
    examples: [
      {
        input: "[5, 2, 8, 1, 3], 2",
        output: "sort: [1, 2, 3, 5, 8], sort_desc: [8, 5, 3, 2, 1], reverse: [3, 1, 8, 2, 5], count: 1",
      }
    ],
    hints: [
      'Use sorted() to get a new sorted list without modifying the original',
      'Pass reverse=True to sorted() for descending order',
      'Use reversed() or list slicing [::-1] to reverse a list',
      'Use list.count() to count occurrences of an element'
    ],
    time_complexity: 'O(n log n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-lists',
  }
];

// Problem Set B: Dictionaries
export const dictionaryProblems: Problem[] = [
  {
    id: 'c2-dicts-basics',
    title: 'Dictionary Basics',
    description: 'Create a function that builds a dictionary from pairs of values.',
    difficulty: 'Easy',
    starter_code: 'def create_dict(keys, values):\n    # Create and return a dictionary using the keys and values lists\n    # If there are more keys than values, set the extra keys to None\n    # If there are more values than keys, ignore the extra values\n    pass\n\ndef get_value(dictionary, key, default=None):\n    # Return the value for the given key\n    # If key doesn\'t exist, return the default value\n    pass\n\ndef update_dict(dictionary, key, value):\n    # Add or update the key-value pair in the dictionary\n    # Return the updated dictionary\n    pass',
    solution_code: 'def create_dict(keys, values):\n    result = {}\n    for i in range(len(keys)):\n        if i < len(values):\n            result[keys[i]] = values[i]\n        else:\n            result[keys[i]] = None\n    return result\n\ndef get_value(dictionary, key, default=None):\n    return dictionary.get(key, default)\n\ndef update_dict(dictionary, key, value):\n    dictionary[key] = value\n    return dictionary',
    test_cases: [
      {
        input: [["a", "b", "c"], [1, 2, 3], "b", 99],
        expected_output: {
          "create": {"a": 1, "b": 2, "c": 3},
          "get": 2,
          "update": {"a": 1, "b": 99, "c": 3}
        },
      },
      {
        input: [["x", "y", "z"], [10], "w", 42],
        expected_output: {
          "create": {"x": 10, "y": null, "z": null},
          "get": 42,
          "update": {"x": 10, "y": null, "z": null, "w": 42}
        },
      }
    ],
    examples: [
      {
        input: '["a", "b", "c"], [1, 2, 3], "b", 99',
        output: 'create: {"a": 1, "b": 2, "c": 3}, get: 2, update: {"a": 1, "b": 99, "c": 3}',
      }
    ],
    hints: [
      'Use dict() or {} to create a new dictionary',
      'Use dict.get(key, default) to safely get values',
      'Assign values with dict[key] = value',
      'Dictionaries are mutable, so functions can modify them directly'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-dictionaries',
  },
  {
    id: 'c2-dicts-methods',
    title: 'Dictionary Methods',
    description: 'Implement functions using common dictionary methods (get, update, pop).',
    difficulty: 'Easy',
    starter_code: 'def safe_get(dict1, key, default="Not found"):\n    # Get a value safely with a default\n    pass\n\ndef merge_dicts(dict1, dict2):\n    # Merge two dictionaries, with dict2 values overriding dict1 if keys clash\n    # Return the new merged dictionary without modifying the originals\n    pass\n\ndef remove_key(dict1, key):\n    # Remove a key from the dictionary and return its value\n    # Return None if the key doesn\'t exist\n    pass\n\ndef get_all_keys(dict1):\n    # Return a list of all keys in the dictionary\n    pass\n\ndef get_all_values(dict1):\n    # Return a list of all values in the dictionary\n    pass',
    solution_code: 'def safe_get(dict1, key, default="Not found"):\n    return dict1.get(key, default)\n\ndef merge_dicts(dict1, dict2):\n    result = dict1.copy()\n    result.update(dict2)\n    return result\n\ndef remove_key(dict1, key):\n    if key in dict1:\n        return dict1.pop(key)\n    return None\n\ndef get_all_keys(dict1):\n    return list(dict1.keys())\n\ndef get_all_values(dict1):\n    return list(dict1.values())',
    test_cases: [
      {
        input: [{"a": 1, "b": 2}, {"b": 3, "c": 4}, "b"],
        expected_output: {
          "safe_get": 2,
          "merge": {"a": 1, "b": 3, "c": 4},
          "remove": 2,
          "keys": ["a", "b"],
          "values": [1, 2]
        },
      },
      {
        input: [{}, {"x": 10}, "y"],
        expected_output: {
          "safe_get": "Not found",
          "merge": {"x": 10},
          "remove": null,
          "keys": [],
          "values": []
        },
      }
    ],
    examples: [
      {
        input: '{"a": 1, "b": 2}, {"b": 3, "c": 4}, "b"',
        output: 'safe_get: 2, merge: {"a": 1, "b": 3, "c": 4}, remove: 2, keys: ["a", "b"], values: [1, 2]',
      }
    ],
    hints: [
      'Use dict.get(key, default) for safe key access',
      'Use dict.update() to merge dictionaries',
      'Use dict.pop(key) to remove a key and get its value',
      'Use dict.keys() and dict.values() to get all keys and values'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-dictionaries',
  },
  {
    id: 'c2-dicts-nested',
    title: 'Nested Dictionaries',
    description: 'Create functions to navigate and modify nested dictionary structures.',
    difficulty: 'Medium',
    starter_code: 'def get_nested_value(data, keys):\n    # Access a nested value using a list of keys\n    # Return None if any key in the path doesn\'t exist\n    # Example: get_nested_value({"a": {"b": {"c": 1}}}, ["a", "b", "c"]) should return 1\n    pass\n\ndef set_nested_value(data, keys, value):\n    # Set a value in a nested structure using a list of keys\n    # Create intermediate dictionaries if they don\'t exist\n    # Return the modified data\n    # Example: set_nested_value({}, ["a", "b", "c"], 1) should return {"a": {"b": {"c": 1}}}\n    pass\n\ndef merge_nested_dicts(dict1, dict2):\n    # Recursively merge two dictionaries\n    # If both dictionaries have a key with a dict value, merge those nested dicts\n    # For non-dict values or if key exists in only one dict, take the value from dict2 if it exists\n    # Return the merged result without modifying the originals\n    pass',
    solution_code: 'def get_nested_value(data, keys):\n    current = data\n    for key in keys:\n        if not isinstance(current, dict) or key not in current:\n            return None\n        current = current[key]\n    return current\n\ndef set_nested_value(data, keys, value):\n    if not keys:\n        return value\n    \n    result = data.copy() if isinstance(data, dict) else {}\n    current = result\n    \n    for i, key in enumerate(keys[:-1]):\n        if key not in current or not isinstance(current[key], dict):\n            current[key] = {}\n        current = current[key]\n        \n    current[keys[-1]] = value\n    return result\n\ndef merge_nested_dicts(dict1, dict2):\n    result = dict1.copy()\n    \n    for key, value in dict2.items():\n        if key in result and isinstance(result[key], dict) and isinstance(value, dict):\n            result[key] = merge_nested_dicts(result[key], value)\n        else:\n            result[key] = value\n            \n    return result',
    test_cases: [
      {
        input: [{"a": {"b": {"c": 1}}}, ["a", "b", "c"], 2],
        expected_output: {
          "get": 1,
          "set": {"a": {"b": {"c": 2}}},
          "merge": {"a": {"b": {"c": 1}}}
        },
      },
      {
        input: [{}, ["x", "y", "z"], 42],
        expected_output: {
          "get": null,
          "set": {"x": {"y": {"z": 42}}},
          "merge": {"x": {"y": {"z": 42}}}
        },
      },
      {
        input: [{"a": 1, "b": {"x": 10}}, {"b": {"y": 20, "x": 30}, "c": 3}, null],
        expected_output: {
          "get": null,
          "set": {"a": 1, "b": {"x": 10}},
          "merge": {"a": 1, "b": {"x": 30, "y": 20}, "c": 3}
        },
      }
    ],
    examples: [
      {
        input: '{"a": {"b": {"c": 1}}}, ["a", "b", "c"], 2',
        output: 'get: 1, set: {"a": {"b": {"c": 2}}}, merge: {"a": {"b": {"c": 1}}}',
      }
    ],
    hints: [
      'Use a loop to traverse the nested dictionary with each key',
      'Check if a key exists before accessing it',
      'For setting nested values, create intermediate dictionaries as needed',
      'For merging, use recursion to handle nested dictionary structures'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-dictionaries',
  },
  {
    id: 'c2-dicts-comprehensions',
    title: 'Dictionary Comprehensions',
    description: 'Convert traditional loops to dictionary comprehensions.',
    difficulty: 'Medium',
    starter_code: 'def squares_dict(numbers):\n    # Create a dictionary where keys are numbers and values are their squares\n    # Use a dictionary comprehension\n    pass\n\ndef filter_dict(dictionary, condition):\n    # Create a new dictionary with only the key-value pairs that satisfy the condition\n    # The condition is a function that takes a key and value and returns True or False\n    # Use a dictionary comprehension\n    pass\n\ndef invert_dict(dictionary):\n    # Create a new dictionary with keys and values swapped\n    # Assume all values in the original dictionary are immutable (strings, numbers, etc.)\n    # Use a dictionary comprehension\n    pass',
    solution_code: 'def squares_dict(numbers):\n    return {num: num**2 for num in numbers}\n\ndef filter_dict(dictionary, condition):\n    return {k: v for k, v in dictionary.items() if condition(k, v)}\n\ndef invert_dict(dictionary):\n    return {v: k for k, v in dictionary.items()}',
    test_cases: [
      {
        input: [[1, 2, 3], {"a": 1, "b": 20, "c": 3}, "v > 2"],
        expected_output: {
          "squares": {1: 1, 2: 4, 3: 9},
          "filter": {"b": 20, "c": 3},
          "invert": {1: "a", 20: "b", 3: "c"}
        },
      },
      {
        input: [[10, 20], {"x": 0, "y": -1}, "v >= 0"],
        expected_output: {
          "squares": {10: 100, 20: 400},
          "filter": {"x": 0},
          "invert": {0: "x", -1: "y"}
        },
      }
    ],
    examples: [
      {
        input: '[1, 2, 3], {"a": 1, "b": 20, "c": 3}, "v > 2"',
        output: 'squares: {1: 1, 2: 4, 3: 9}, filter: {"b": 20, "c": 3}, invert: {1: "a", 20: "b", 3: "c"}',
      }
    ],
    hints: [
      'Dictionary comprehension syntax: {key_expr: value_expr for item in iterable}',
      'Filter with: {k: v for k, v in dict.items() if condition}',
      'Use dict.items() to iterate through key-value pairs'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-dictionaries',
  },
  {
    id: 'c2-dicts-patterns',
    title: 'Common Dictionary Patterns',
    description: 'Implement a counter, lookup table, and grouping using dictionaries.',
    difficulty: 'Medium',
    starter_code: 'def count_elements(items):\n    # Create a dictionary counting the occurrences of each element in items\n    pass\n\ndef group_by_initial(words):\n    # Group words by their first letter\n    # Return a dictionary where keys are first letters and values are lists of words\n    pass\n\ndef map_values(values, value_map):\n    # Map each value in values to its corresponding value in value_map\n    # If a value is not in value_map, keep the original value\n    # Return the list of mapped values\n    pass',
    solution_code: 'def count_elements(items):\n    counter = {}\n    for item in items:\n        counter[item] = counter.get(item, 0) + 1\n    return counter\n\ndef group_by_initial(words):\n    groups = {}\n    for word in words:\n        if word:\n            initial = word[0]\n            if initial not in groups:\n                groups[initial] = []\n            groups[initial].append(word)\n    return groups\n\ndef map_values(values, value_map):\n    return [value_map.get(val, val) for val in values]',
    test_cases: [
      {
        input: [["a", "b", "a", "c", "b", "a"], ["apple", "banana", "avocado", "cherry"], [1, 2, 3, 4], {1: "one", 3: "three"}],
        expected_output: {
          "counter": {"a": 3, "b": 2, "c": 1},
          "grouping": {"a": ["apple", "avocado"], "b": ["banana"], "c": ["cherry"]},
          "mapping": ["one", 2, "three", 4]
        },
      },
      {
        input: [[], [], [5, 6, 7], {7: "seven"}],
        expected_output: {
          "counter": {},
          "grouping": {},
          "mapping": [5, 6, "seven"]
        },
      }
    ],
    examples: [
      {
        input: '["a", "b", "a", "c", "b", "a"], ["apple", "banana", "avocado", "cherry"]',
        output: 'counter: {"a": 3, "b": 2, "c": 1}, grouping: {"a": ["apple", "avocado"], "b": ["banana"], "c": ["cherry"]}',
      }
    ],
    hints: [
      'For counting elements, increment a counter for each item',
      'Use dict.get(key, default) to handle missing keys',
      'For grouping, use lists as values to collect multiple items per key',
      'For mapping, create a new list by looking up each value in the map'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-dictionaries',
  }
];

// Problem Set C: Tuples and Sets
export const tuplesAndSetsProblems: Problem[] = [
  {
    id: 'c2-tuples-basics',
    title: 'Tuple Basics',
    description: 'Create functions that operate on tuples (accessing, unpacking).',
    difficulty: 'Easy',
    starter_code: 'def get_tuple_element(tup, index):\n    # Return the element at the given index\n    # Return None if index is out of range\n    pass\n\ndef unpack_tuple(tup):\n    # Unpack the tuple into three variables a, b, and c\n    # If the tuple has fewer than 3 elements, pad with None\n    # If the tuple has more than 3 elements, take only the first 3\n    # Return a new tuple (a, b, c)\n    pass\n\ndef create_tuple_pairs(list1, list2):\n    # Create a list of tuples where each tuple contains corresponding elements\n    # If one list is shorter, ignore extra elements from the longer list\n    # E.g., [1, 2], ["a", "b", "c"] should give [(1, "a"), (2, "b")]\n    pass',
    solution_code: 'def get_tuple_element(tup, index):\n    try:\n        return tup[index]\n    except (IndexError, TypeError):\n        return None\n\ndef unpack_tuple(tup):\n    a, b, c = tuple(list(tup[:3]) + [None] * (3 - min(3, len(tup))))\n    return (a, b, c)\n\ndef create_tuple_pairs(list1, list2):\n    return [(list1[i], list2[i]) for i in range(min(len(list1), len(list2)))]',
    test_cases: [
      {
        input: [(1, 2, 3, 4), 1, [10, 20], ["a", "b"]],
        expected_output: {
          "element": 2,
          "unpack": [1, 2, 3],
          "pairs": [[10, "a"], [20, "b"]]
        },
      },
      {
        input: [(5,), 5, [1, 2, 3], ["a"]],
        expected_output: {
          "element": null,
          "unpack": [5, null, null],
          "pairs": [[1, "a"]]
        },
      },
      {
        input: [(), 0, [], ["x", "y"]],
        expected_output: {
          "element": null,
          "unpack": [null, null, null],
          "pairs": []
        },
      }
    ],
    examples: [
      {
        input: '(1, 2, 3, 4), 1, [10, 20], ["a", "b"]',
        output: 'element: 2, unpack: (1, 2, 3), pairs: [(10, "a"), (20, "b")]',
      }
    ],
    hints: [
      'Tuples are immutable sequences accessed with square brackets like lists',
      'Use tuple unpacking with assignment: a, b, c = some_tuple',
      'Use list comprehension to create pairs of elements',
      'Handle edge cases with try/except or careful length checks'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-tuples-sets',
  },
  {
    id: 'c2-sets-basics',
    title: 'Set Basics',
    description: 'Implement functions using set operations (union, intersection, difference).',
    difficulty: 'Easy',
    starter_code: 'def set_union(set1, set2):\n    # Return the union of two sets (all elements from both sets)\n    pass\n\ndef set_intersection(set1, set2):\n    # Return the intersection of two sets (elements common to both sets)\n    pass\n\ndef set_difference(set1, set2):\n    # Return the difference of set1 and set2 (elements in set1 but not in set2)\n    pass\n\ndef is_subset(set1, set2):\n    # Return True if set1 is a subset of set2 (all elements of set1 are in set2)\n    pass\n\ndef has_duplicates(items):\n    # Return True if the list of items contains any duplicates\n    pass',
    solution_code: 'def set_union(set1, set2):\n    return set1 | set2\n\ndef set_intersection(set1, set2):\n    return set1 & set2\n\ndef set_difference(set1, set2):\n    return set1 - set2\n\ndef is_subset(set1, set2):\n    return set1 <= set2\n\ndef has_duplicates(items):\n    return len(items) > len(set(items))',
    test_cases: [
      {
        input: [{1, 2, 3}, {3, 4, 5}, [1, 2, 2, 3, 4]],
        expected_output: {
          "union": [1, 2, 3, 4, 5],
          "intersection": [3],
          "difference": [1, 2],
          "is_subset": false,
          "has_duplicates": true
        },
      },
      {
        input: [{1, 2}, {1, 2, 3}, ["a", "b", "c"]],
        expected_output: {
          "union": [1, 2, 3],
          "intersection": [1, 2],
          "difference": [],
          "is_subset": true,
          "has_duplicates": false
        },
      }
    ],
    examples: [
      {
        input: '{1, 2, 3}, {3, 4, 5}, [1, 2, 2, 3, 4]',
        output: 'union: {1, 2, 3, 4, 5}, intersection: {3}, difference: {1, 2}, is_subset: False, has_duplicates: True',
      }
    ],
    hints: [
      'Use the | operator for union, & for intersection, - for difference',
      'Use <= operator to check if one set is a subset of another',
      'Convert a list to a set to remove duplicates',
      'Compare original list length with set length to check for duplicates'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-tuples-sets',
  },
  {
    id: 'c2-sets-methods',
    title: 'Set Methods',
    description: 'Create functions demonstrating various set methods (add, remove, discard).',
    difficulty: 'Easy',
    starter_code: 'def add_elements(set_obj, elements):\n    # Add all elements to the set\n    # Return the modified set\n    pass\n\ndef remove_element_safely(set_obj, element):\n    # Remove the element from the set if it exists\n    # Don\'t raise an error if the element doesn\'t exist\n    # Return the modified set\n    pass\n\ndef pop_element(set_obj):\n    # Remove and return a random element from the set\n    # Return None if the set is empty\n    pass\n\ndef clear_set(set_obj):\n    # Remove all elements from the set\n    # Return the empty set\n    pass',
    solution_code: 'def add_elements(set_obj, elements):\n    for element in elements:\n        set_obj.add(element)\n    return set_obj\n\ndef remove_element_safely(set_obj, element):\n    set_obj.discard(element)\n    return set_obj\n\ndef pop_element(set_obj):\n    try:\n        return set_obj.pop()\n    except KeyError:\n        return None\n\ndef clear_set(set_obj):\n    set_obj.clear()\n    return set_obj',
    test_cases: [
      {
        input: [{1, 2}, [3, 4], 2],
        expected_output: {
          "add": [1, 2, 3, 4],
          "remove": [1],
          "pop": "any_element",
          "clear": []
        },
      },
      {
        input: [set(), [5, 6], 7],
        expected_output: {
          "add": [5, 6],
          "remove": [],
          "pop": null,
          "clear": []
        },
      }
    ],
    examples: [
      {
        input: '{1, 2}, [3, 4], 2',
        output: 'add: {1, 2, 3, 4}, remove: {1}, pop: (depends on implementation), clear: set()',
      }
    ],
    hints: [
      'Use set.add() to add elements to a set',
      'Use set.discard() to remove an element without raising errors',
      'Use set.pop() to remove and return an arbitrary element',
      'Use set.clear() to remove all elements'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-tuples-sets',
  },
  {
    id: 'c2-data-structures-selection',
    title: 'When to Use Each',
    description: 'Convert between lists, tuples, and sets based on requirements.',
    difficulty: 'Medium',
    starter_code: 'def choose_data_structure(items, needs_ordering, allows_duplicates, needs_mutability):\n    # Choose the right data structure based on requirements\n    # Return the items converted to the appropriate data structure: list, tuple, or set\n    # Arguments:\n    #   needs_ordering: if True, the elements must maintain their order\n    #   allows_duplicates: if True, the structure should allow duplicate elements\n    #   needs_mutability: if True, the structure needs to be mutable\n    pass\n\ndef optimize_for_lookups(items):\n    # Convert the items to a data structure that optimizes lookups (membership testing)\n    # Return the new data structure\n    pass\n\ndef preserve_unique_ordering(items):\n    # Remove duplicates from the items while preserving the original order\n    # Return the result as a list\n    pass',
    solution_code: 'def choose_data_structure(items, needs_ordering, allows_duplicates, needs_mutability):\n    if needs_ordering:\n        if allows_duplicates:\n            return list(items) if needs_mutability else tuple(items)\n        else:\n            # For ordered, unique items we need to preserve order manually since sets don\'t preserve order\n            return list(dict.fromkeys(items)) if needs_mutability else tuple(dict.fromkeys(items))\n    else:\n        if allows_duplicates:\n            return list(items) if needs_mutability else tuple(items)\n        else:\n            return set(items)\n\ndef optimize_for_lookups(items):\n    return set(items)\n\ndef preserve_unique_ordering(items):\n    return list(dict.fromkeys(items))',
    test_cases: [
      {
        input: [[1, 2, 3, 2, 1], "true", "true", "true"],
        expected_output: {
          "choose": [1, 2, 3, 2, 1],
          "optimize": [1, 2, 3],
          "preserve_order": [1, 2, 3]
        },
      },
      {
        input: [[5, 5, 5, 5, 5], "true", "false", "false"],
        expected_output: {
          "choose": [5],
          "optimize": [5],
          "preserve_order": [5]
        },
      },
      {
        input: [[3, 1, 4, 1, 5, 9], "false", "false", "true"],
        expected_output: {
          "choose": [1, 3, 4, 5, 9],
          "optimize": [1, 3, 4, 5, 9],
          "preserve_order": [3, 1, 4, 5, 9]
        },
      }
    ],
    examples: [
      {
        input: '[1, 2, 3, 2, 1], True, True, True',
        output: 'choose: [1, 2, 3, 2, 1], optimize: {1, 2, 3}, preserve_order: [1, 2, 3]',
      }
    ],
    hints: [
      'Lists maintain order, allow duplicates, and are mutable',
      'Tuples maintain order, allow duplicates, but are immutable',
      'Sets don\'t maintain order or allow duplicates, but have fast lookups',
      'To preserve order with unique elements, use dict.fromkeys() or a custom approach'
    ],
    time_complexity: 'O(n)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-tuples-sets',
  },
  {
    id: 'c2-data-structures-operations',
    title: 'Data Structure Operations',
    description: 'Implement functions that combine operations on lists, dictionaries, and sets.',
    difficulty: 'Medium',
    starter_code: 'def count_unique_words(text):\n    # Count the occurrences of each unique word in the text\n    # Return a dictionary mapping words to their counts\n    # Words should be case-insensitive (convert all to lowercase)\n    # Ignore punctuation (assume words are separated by whitespace)\n    pass\n\ndef find_common_elements(list_of_lists):\n    # Find elements common to all lists\n    # Return a list of the common elements in any order\n    # If list_of_lists is empty, return an empty list\n    pass\n\ndef group_anagrams(words):\n    # Group words that are anagrams of each other\n    # Return a list of lists, where each inner list contains a group of anagrams\n    # Anagrams are words with the same letters but possibly different order\n    pass',
    solution_code: 'def count_unique_words(text):\n    words = text.lower().split()\n    word_counts = {}\n    \n    for word in words:\n        # Remove any trailing punctuation\n        word = word.strip(".,!?;:")\n        word_counts[word] = word_counts.get(word, 0) + 1\n        \n    return word_counts\n\ndef find_common_elements(list_of_lists):\n    if not list_of_lists:\n        return []\n    \n    common = set(list_of_lists[0])\n    for lst in list_of_lists[1:]:\n        common &= set(lst)\n        \n    return list(common)\n\ndef group_anagrams(words):\n    anagram_groups = {}\n    \n    for word in words:\n        # Use sorted letters as a key\n        key = "".join(sorted(word))\n        if key in anagram_groups:\n            anagram_groups[key].append(word)\n        else:\n            anagram_groups[key] = [word]\n            \n    return list(anagram_groups.values())',
    test_cases: [
      {
        input: ["The quick brown fox jumps over the lazy dog.", [[1, 2, 3], [2, 3, 4], [3, 4, 5]], ["eat", "tea", "tan", "ate", "nat", "bat"]],
        expected_output: {
          "word_counts": {"the": 2, "quick": 1, "brown": 1, "fox": 1, "jumps": 1, "over": 1, "lazy": 1, "dog": 1},
          "common_elements": [3],
          "anagram_groups": [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
        },
      },
      {
        input: ["", [[1, 2], [3, 4]], []],
        expected_output: {
          "word_counts": {},
          "common_elements": [],
          "anagram_groups": []
        },
      }
    ],
    examples: [
      {
        input: '"The quick brown fox", [[1, 2, 3], [2, 3, 4]], ["eat", "tea"]',
        output: 'word_counts: {"the": 1, "quick": 1, "brown": 1, "fox": 1}, common_elements: [], anagram_groups: [["eat", "tea"]]',
      }
    ],
    hints: [
      'For word counting, use a dictionary and string methods like split() and lower()',
      'For finding common elements, convert lists to sets and use the intersection operator (&)',
      'For grouping anagrams, use a dictionary with sorted characters as keys'
    ],
    time_complexity: 'O(n * m)',
    space_complexity: 'O(n)',
    course_id: 'course-2',
    topic_id: 'topic-tuples-sets',
  }
];

// Combine all Course 2 problems
export const course2Problems: Problem[] = [
  ...listProblems,
  ...dictionaryProblems,
  ...tuplesAndSetsProblems
];
