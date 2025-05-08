
import { Problem } from './types';

export const hardProblems: Problem[] = [
  {
    id: "recursive_fibonacci",
    title: "Recursive Fibonacci",
    description: "Create a recursive function to calculate the nth Fibonacci number. The Fibonacci sequence is where each number is the sum of the two preceding ones, starting from 0 and 1. For example, the sequence starts: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...",
    difficulty: "Hard",
    signature_hint: "def fibonacci(n: int) -> int:",
    examples: [
      {
        input: "fibonacci(0)",
        output: "0"
      },
      {
        input: "fibonacci(1)",
        output: "1"
      },
      {
        input: "fibonacci(6)",
        output: "8"
      }
    ],
    test_cases: [
      {
        input: 0,
        expected_output: 0
      },
      {
        input: 1,
        expected_output: 1
      },
      {
        input: 2,
        expected_output: 1
      },
      {
        input: 6,
        expected_output: 8
      },
      {
        input: 10,
        expected_output: 55
      },
      {
        input: 15,
        expected_output: 610
      }
    ],
    starter_code: "def fibonacci(n: int) -> int:\n    # Your code here\n    pass",
    solution: "def fibonacci(n: int) -> int:\n    if n <= 0:\n        return 0\n    elif n == 1:\n        return 1\n    else:\n        return fibonacci(n-1) + fibonacci(n-2)",
    explanation: "This solution uses recursion to calculate the Fibonacci number. The base cases are n=0 returning 0, and n=1 returning 1. For any other value of n, we recursively calculate the sum of the previous two Fibonacci numbers. Note that this implementation is not optimized for large values of n due to repeated calculations."
  },
  {
    id: "binary_search_tree",
    title: "Binary Search Tree Validation",
    description: "Write a function that checks whether a binary search tree is valid. A binary search tree is valid if all values in the left subtree of a node are less than the node's value, and all values in the right subtree are greater than the node's value. Additionally, both the left and right subtrees must also be valid binary search trees.",
    difficulty: "Hard",
    signature_hint: "def is_valid_bst(root) -> bool:",
    examples: [
      {
        input: "TreeNode(2, TreeNode(1), TreeNode(3))",
        output: "True"
      },
      {
        input: "TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6)))",
        output: "False"
      }
    ],
    test_cases: [
      {
        input: 'TreeNode(2, TreeNode(1), TreeNode(3))',
        expected_output: True
      },
      {
        input: 'TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6)))',
        expected_output: False
      },
      {
        input: 'TreeNode(5, TreeNode(4), TreeNode(6, TreeNode(3), TreeNode(7)))',
        expected_output: False
      },
      {
        input: 'TreeNode(10, TreeNode(5, TreeNode(3), TreeNode(7)), TreeNode(15, TreeNode(12), TreeNode(20)))',
        expected_output: True
      },
      {
        input: 'None',
        expected_output: True
      }
    ],
    starter_code: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_valid_bst(root) -> bool:\n    # Your code here\n    pass",
    solution: "def is_valid_bst(root) -> bool:\n    def validate(node, low=float('-inf'), high=float('inf')):\n        # Empty trees are valid BSTs\n        if not node:\n            return True\n        \n        # Current node's value must be between low and high\n        if node.val <= low or node.val >= high:\n            return False\n        \n        # Left subtree must be a valid BST with values < node.val\n        # Right subtree must be a valid BST with values > node.val\n        return (validate(node.left, low, node.val) and \n                validate(node.right, node.val, high))\n    \n    return validate(root)",
    explanation: "This solution uses a helper function that recursively validates each node in the tree with a valid range. For each node, we check if its value is within the allowed range. Then, we recursively check the left subtree (with the upper bound set to the current node's value) and the right subtree (with the lower bound set to the current node's value). If at any point we find a node with a value outside its allowed range, we return False. Empty nodes are considered valid BSTs."
  },
  {
    id: "lru_cache",
    title: "LRU Cache Implementation",
    description: "Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get(key) and put(key, value).\n\nget(key) - Get the value of the key if the key exists in the cache, otherwise return -1.\nput(key, value) - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least recently used item before inserting a new item.",
    difficulty: "Hard",
    signature_hint: "class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    \n    def get(self, key: int) -> int:\n        pass\n    \n    def put(self, key: int, value: int) -> None:\n        pass",
    examples: [
      {
        input: "LRUCache cache = new LRUCache(2);\ncache.put(1, 1);\ncache.put(2, 2);\ncache.get(1);       // returns 1\ncache.put(3, 3);    // evicts key 2\ncache.get(2);       // returns -1 (not found)\ncache.put(4, 4);    // evicts key 1\ncache.get(1);       // returns -1 (not found)\ncache.get(3);       // returns 3\ncache.get(4);       // returns 4",
        output: "[None, None, None, 1, None, -1, None, -1, 3, 4]"
      }
    ],
    test_cases: [
      {
        input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
        expected_output: [None, None, None, 1, None, -1, None, -1, 3, 4]
      },
      {
        input: '["LRUCache","put","get","put","get","get"]\\n[[1],[2,1],[2],[3,2],[2],[3]]',
        expected_output: [None, None, 1, None, -1, 2]
      }
    ],
    starter_code: "class LRUCache:\n    def __init__(self, capacity: int):\n        # Your code here\n        pass\n    \n    def get(self, key: int) -> int:\n        # Your code here\n        pass\n    \n    def put(self, key: int, value: int) -> None:\n        # Your code here\n        pass\n\n# Example usage:\n# cache = LRUCache(2)\n# cache.put(1, 1)\n# cache.put(2, 2)\n# print(cache.get(1))  # returns 1\n# cache.put(3, 3)      # evicts key 2\n# print(cache.get(2))  # returns -1 (not found)",
    solution: "class Node:\n    def __init__(self, key, val):\n        self.key = key\n        self.val = val\n        self.prev = None\n        self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = {}  # map key to node\n        \n        # Initialize dummy head and tail nodes\n        self.head = Node(0, 0)\n        self.tail = Node(0, 0)\n        self.head.next = self.tail\n        self.tail.prev = self.head\n    \n    def _add_node(self, node):\n        \"\"\"Add node right after head\"\"\"\n        node.prev = self.head\n        node.next = self.head.next\n        \n        self.head.next.prev = node\n        self.head.next = node\n    \n    def _remove_node(self, node):\n        \"\"\"Remove an existing node\"\"\"\n        prev = node.prev\n        new = node.next\n        \n        prev.next = new\n        new.prev = prev\n    \n    def _move_to_head(self, node):\n        \"\"\"Move node to the head (most recently used)\"\"\"\n        self._remove_node(node)\n        self._add_node(node)\n    \n    def _pop_tail(self):\n        \"\"\"Remove the least recently used item (tail)\"\"\"\n        res = self.tail.prev\n        self._remove_node(res)\n        return res\n    \n    def get(self, key: int) -> int:\n        if key not in self.cache:\n            return -1\n        \n        # Move the accessed node to the head\n        node = self.cache[key]\n        self._move_to_head(node)\n        \n        return node.val\n    \n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            # Update existing key\n            node = self.cache[key]\n            node.val = value\n            self._move_to_head(node)\n        else:\n            # Add new key\n            new_node = Node(key, value)\n            self.cache[key] = new_node\n            self._add_node(new_node)\n            \n            # Check capacity\n            if len(self.cache) > self.capacity:\n                # Remove the least recently used item\n                tail = self._pop_tail()\n                del self.cache[tail.key]",
    explanation: "This solution implements an LRU cache using a hash map and a doubly linked list. The hash map provides O(1) lookup time, while the doubly linked list allows us to efficiently track the order of usage. When we get or put an item, we move it to the front of the list (most recently used). When the cache exceeds its capacity, we remove the item at the end of the list (least recently used). The implementation uses dummy head and tail nodes to simplify the list operations."
  }
];
