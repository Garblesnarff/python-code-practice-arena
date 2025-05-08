
import { Problem } from './types';

export const hardProblems: Problem[] = [
  {
    id: "binary_search",
    title: "Binary Search",
    difficulty: 'Hard',
    description: "Write a binary search function that finds an element in a sorted array. Return the index of the element if found, or -1 if not found.",
    signature_hint: "def binary_search(arr, target):",
    examples: [
      { input: "[1, 3, 5, 7, 9], 5", output: "2" },
      { input: "[2, 4, 6, 8, 10], 9", output: "-1" }
    ],
    test_cases: [
      { input: [[1, 3, 5, 7, 9], 5], expected_output: 2 },
      { input: [[2, 4, 6, 8, 10], 9], expected_output: -1 },
      { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1], expected_output: 0 },
      { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10], expected_output: 9 },
      { input: [[], 5], expected_output: -1 }
    ],
    starter_code: "def binary_search(arr, target):\n    # Your code here\n    pass",
    solution: "def binary_search(arr, target):\n    # Initialize low and high pointers\n    low = 0\n    high = len(arr) - 1\n    \n    # Continue search while low <= high\n    while low <= high:\n        # Calculate mid point\n        mid = (low + high) // 2\n        \n        # Found target\n        if arr[mid] == target:\n            return mid\n        # Target is in the left half\n        elif arr[mid] > target:\n            high = mid - 1\n        # Target is in the right half\n        else:\n            low = mid + 1\n    \n    # Target was not found\n    return -1",
    explanation: "The binary search algorithm efficiently finds an element in a sorted array by repeatedly dividing the search interval in half. This approach is much faster than linear search (O(log n) vs O(n)):\n\n1. We start with a search range spanning the entire array.\n2. We calculate the middle element of the current range.\n3. If the middle element is the target, we've found it and return its index.\n4. If the middle element is greater than the target, we restrict our search to the left half.\n5. If the middle element is less than the target, we restrict our search to the right half.\n6. We continue this process until we either find the target or exhaust the search range.\n\nBinary search only works on sorted arrays, but it's extremely efficient. For an array of a million elements, it requires at most 20 comparisons, compared to potentially a million comparisons for linear search."
  },
  {
    id: "detect_cycle",
    title: "Detect Cycle in Linked List",
    difficulty: 'Hard',
    description: "Write a function that determines if a linked list contains a cycle. A cycle occurs when a node's next pointer points to a previous node in the list, creating a loop.",
    signature_hint: "def has_cycle(head):",
    examples: [
      { input: "LinkedList: 1->2->3->4->2 (points back to second node)", output: "True" },
      { input: "LinkedList: 1->2->3->4", output: "False" }
    ],
    test_cases: [
      { input: [{"val": 1, "next": {"val": 2, "next": {"val": 3, "next": {"val": 4, "next": null}}}}], expected_output: false },
      { input: [{"val": 1, "next": null}], expected_output: false },
      { input: [], expected_output: false },
      { input: [{"val": 1, "next": {"val": 2, "next": {"val": 3, "next": {"val": 4, "next": "cycle"}}}}], expected_output: true },
      { input: [{"val": 1, "next": "cycle"}], expected_output: true }
    ],
    starter_code: "def has_cycle(head):\n    # For this problem, the linked list is simplified.\n    # If a node points to a cycle, the 'next' value will be the string 'cycle'\n    # Your code here\n    pass",
    solution: "def has_cycle(head):\n    # Handle empty list\n    if not head:\n        return False\n    \n    # Initialize two pointers\n    slow = head\n    fast = head\n    \n    # Traverse the list\n    while fast and fast.get('next'):\n        # Move slow pointer one step\n        slow = slow.get('next')\n        \n        # Move fast pointer two steps\n        fast = fast.get('next')\n        if fast and fast.get('next') != 'cycle':\n            fast = fast.get('next')\n        \n        # Check for cycle\n        if fast == 'cycle' or slow == 'cycle' or fast == slow:\n            return True\n    \n    # No cycle found\n    return False",
    explanation: "This solution uses the 'tortoise and hare' algorithm (also known as Floyd's cycle finding algorithm) to detect a cycle in a linked list:\n\n1. We use two pointers, 'slow' and 'fast', both initially pointing to the head.\n2. The slow pointer moves one step at a time, while the fast pointer moves two steps.\n3. If there's a cycle, the fast pointer will eventually catch up to the slow pointer.\n4. If the fast pointer reaches the end of the list (null), then there's no cycle.\n\nFor our simplified implementation, we're also checking if any node's 'next' pointer is the string 'cycle', which indicates a cycle in our test environment.\n\nThe algorithm has O(n) time complexity and O(1) space complexity, making it very efficient for detecting cycles in linked lists."
  },
  {
    id: "lru_cache",
    title: "LRU Cache Implementation",
    difficulty: 'Hard',
    description: "Implement a Least Recently Used (LRU) cache with get and put operations. The cache should have a fixed capacity and remove the least recently used item when full.",
    signature_hint: "class LRUCache:\n    def __init__(self, capacity):\n        # Initialize your data structure here\n        \n    def get(self, key):\n        # Get value of key if exists, otherwise return -1\n        \n    def put(self, key, value):\n        # Set or update key's value; if cache is full, evict least recently used item",
    examples: [
      { input: 'LRUCache(2); put(1, 1); put(2, 2); get(1); put(3, 3); get(2)', output: 'get(1) returns 1; get(2) returns -1' }
    ],
    test_cases: [
      { input: [{"method": "LRUCache", "params": [2]}, {"method": "put", "params": [1, 1]}, {"method": "put", "params": [2, 2]}, {"method": "get", "params": [1]}, {"method": "put", "params": [3, 3]}, {"method": "get", "params": [2]}, {"method": "put", "params": [4, 4]}, {"method": "get", "params": [1]}, {"method": "get", "params": [3]}, {"method": "get", "params": [4]}], expected_output: [null, null, null, 1, null, -1, null, -1, 3, 4] },
      { input: [{"method": "LRUCache", "params": [1]}, {"method": "put", "params": [1, 1]}, {"method": "get", "params": [1]}, {"method": "put", "params": [2, 2]}, {"method": "get", "params": [1]}, {"method": "get", "params": [2]}], expected_output: [null, null, 1, null, -1, 2] }
    ],
    starter_code: "class LRUCache:\n    def __init__(self, capacity):\n        # Your code here\n        pass\n    \n    def get(self, key):\n        # Your code here\n        pass\n    \n    def put(self, key, value):\n        # Your code here\n        pass",
    solution: "class LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.cache = {}  # key -> (value, timestamp)\n        self.timestamp = 0\n    \n    def get(self, key):\n        if key not in self.cache:\n            return -1\n        \n        # Update timestamp to mark as recently used\n        value = self.cache[key][0]\n        self.cache[key] = (value, self.timestamp)\n        self.timestamp += 1\n        return value\n    \n    def put(self, key, value):\n        # If key already exists, just update its value and timestamp\n        if key in self.cache:\n            self.cache[key] = (value, self.timestamp)\n            self.timestamp += 1\n            return\n        \n        # If cache is full, remove least recently used item\n        if len(self.cache) >= self.capacity:\n            # Find key with lowest timestamp (least recently used)\n            lru_key = min(self.cache, key=lambda k: self.cache[k][1])\n            self.cache.pop(lru_key)\n        \n        # Add new key-value pair with current timestamp\n        self.cache[key] = (value, self.timestamp)\n        self.timestamp += 1",
    explanation: "This solution implements an LRU cache using a dictionary and timestamps:\n\n1. We use a dictionary (cache) to store key-value pairs along with timestamps.\n2. Each time an item is accessed or inserted, we update its timestamp.\n3. When the cache reaches capacity and we need to insert a new item, we find and remove the item with the oldest timestamp (least recently used).\n\nIn a real-world implementation, you might use a more efficient data structure like an OrderedDict in Python or a combination of a HashMap and a doubly-linked list, which would provide O(1) time complexity for all operations. Our implementation using timestamps is O(n) for the eviction operation but easier to understand.\n\nThe LRU cache is useful in many applications where you want to keep the most recently accessed items in memory while discarding those that haven't been used in a while."
  }
];
