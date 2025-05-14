import { Problem } from './types';

// UUIDs for real database entities (replace these with your actual UUIDs for course 2 and each topic)
const COURSE2_UUID = "PUT-YOUR-COURSE2-UUID-HERE";
const TOPIC_LISTS_UUID = "PUT-YOUR-TOPIC-LISTS-UUID-HERE";
const TOPIC_DICTIONARIES_UUID = "PUT-YOUR-TOPIC-DICTIONARIES-UUID-HERE";
const TOPIC_TUPLES_SETS_UUID = "PUT-YOUR-TOPIC-TUPLES-SETS-UUID-HERE";

export const course2Problems: Problem[] = [
  {
    id: 'c2-lists-basics',
    title: 'List Basics',
    description: 'Create a function that performs basic list operations (append, remove, insert).',
    difficulty: 'Easy',
    course_id: COURSE2_UUID,
    topic_id: TOPIC_LISTS_UUID,
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
  },
  {
    id: 'c2-lists-indexing',
    title: 'List Indexing and Slicing',
    description: 'Implement functions that retrieve elements using different indexing and slicing patterns.',
    difficulty: 'Easy',
    course_id: COURSE2_UUID,
    topic_id: TOPIC_LISTS_UUID,
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
  },
  {
    id: 'c2-lists-comprehensions',
    title: 'List Comprehensions',
    description: 'Convert traditional for loops to list comprehensions.',
    difficulty: 'Medium',
    course_id: COURSE2_UUID,
    topic_id: TOPIC_LISTS_UUID,
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
  },
  {
    id: 'c2-lists-nested',
    title: 'Nested Lists',
    description: 'Create functions to manipulate a matrix represented as a list of lists.',
    difficulty: 'Medium',
    course_id: COURSE2_UUID,
    topic_id: TOPIC_LISTS_UUID,
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
  },
  {
    id: 'c2-lists-methods',
    title: 'List Methods',
    description: 'Implement functions that use sorted(), reverse(), and other list methods.',
    difficulty: 'Easy',
    course_id: COURSE2_UUID,
    topic_id: TOPIC_LISTS_UUID,
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
  },
  {
    id: 'c2-data-structures-selection',
    title: 'When to Use Each',
    description: 'Convert between lists, tuples, and sets based on requirements.',
    difficulty: 'Medium',
    course_id: COURSE2_UUID,
    topic_id: TOPIC_LISTS_UUID,
    starter_code: 'def choose_data_structure(items, needs_ordering, allows_duplicates, needs_mutability):\n    # Choose the right data structure based on requirements\n    # Return the items converted to the appropriate data structure: list, tuple, or set\n    # Arguments:\n    #   needs_ordering: if True, the elements must maintain their order\n    #   allows_duplicates: if True, the structure should allow duplicate elements\n    #   needs_mutability: if True, the structure needs to be mutable\n    pass\n\ndef optimize_for_lookups(items):\n    # Convert the items to a data structure that optimizes lookups (membership testing)\n    # Return the new data structure\n    pass\n\ndef preserve_unique_ordering(items):\n    # Remove duplicates from the items while preserving the original order\n    # Return the result as a list\n    pass',
    solution_code: 'def choose_data_structure(items, needs_ordering, allows_duplicates, needs_mutability):\n    if needs_ordering:\n        if allows_duplicates:\n            return list(items) if needs_mutability else tuple(items)\n        else:\n            return list(dict.fromkeys(items)) if needs_mutability else tuple(dict.fromkeys(items))\n    else:\n        if allows_duplicates:\n            return list(items) if needs_mutability else tuple(items)\n        else:\n            return set(items)\n\ndef optimize_for_lookups(items):\n    return set(items)\n\ndef preserve_unique_ordering(items):\n    return list(dict.fromkeys(items))',
    test_cases: [
      {
        input: [[1, 2, 3, 2, 1], true, true, true],
        expected_output: {
          "choose": [1, 2, 3, 2, 1],
          "optimize": [1, 2, 3],
          "preserve_order": [1, 2, 3]
        },
      },
      {
        input: [[5, 5, 5, 5, 5], true, false, false],
        expected_output: {
          "choose": [5],
          "optimize": [5],
          "preserve_order": [5]
        },
      },
      {
        input: [[3, 1, 4, 1, 5, 9], false, false, true],
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
  },
  {
    id: 'c2-data-structures-operations',
    title: 'Data Structure Operations',
    description: 'Implement functions that combine operations on lists, dictionaries, and sets.',
    difficulty: 'Medium',
    course_id: COURSE2_UUID,
    topic_id: TOPIC_LISTS_UUID,
    starter_code: 'def count_unique_words(text):\n    # Count the occurrences of each unique word in the text\n    # Return a dictionary mapping words to their counts\n    # Words should be case-insensitive (convert all to lowercase)\n    # Ignore punctuation (assume words are separated by whitespace)\n    pass\n\ndef find_common_elements(list_of_lists):\n    # Find elements common to all lists\n    # Return a list of the common elements in any order\n    # If list_of_lists is empty, return an empty list\n    pass\n\ndef group_anagrams(words):\n    # Group words that are anagrams of each other\n    # Return a list of lists, where each inner list contains a group of anagrams\n    # Anagrams are words with the same letters but possibly different order\n    pass',
    solution_code: 'def count_unique_words(text):\n    words = text.lower().split()\n    word_counts = {}\n    \n    for word in words:\n        word = word.strip(".,!?;:")\n        word_counts[word] = word_counts.get(word, 0) + 1\n    return word_counts\n\ndef find_common_elements(list_of_lists):\n    if not list_of_lists:\n        return []\n    \n    common = set(list_of_lists[0])\n    for lst in list_of_lists[1:]:\n        common &= set(lst)\n    return list(common)\n\ndef group_anagrams(words):\n    anagram_groups = {}\n    \n    for word in words:\n        key = "".join(sorted(word))\n        if key in anagram_groups:\n            anagram_groups[key].append(word)\n        else:\n            anagram_groups[key] = [word]\n    return list(anagram_groups.values())',
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
  }
];
