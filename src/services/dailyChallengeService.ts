
import { Problem } from '@/data/problems/types';
import { supabase } from '@/integrations/supabase/client';

export async function getProblemById(id: string): Promise<Problem> {
  // In a real implementation, this would fetch from Supabase
  // For now, let's return a mock problem
  const mockProblem: Problem = {
    id,
    title: "Daily Challenge: String Reversal",
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    difficulty: "Easy",
    category: "Strings",
    starterCode: "def reverse_string(s):\n    # Write your code here\n    pass",
    testCases: [
      { input: "['h','e','l','l','o']", expected: "['o','l','l','e','h']", hidden: false },
      { input: "['H','a','n','n','a','h']", expected: "['h','a','n','n','a','H']", hidden: false }
    ],
    examples: [
      {
        input: "['h','e','l','l','o']",
        output: "['o','l','l','e','h']",
        explanation: "Reverse the array of characters."
      },
      {
        input: "['H','a','n','n','a','h']",
        output: "['h','a','n','n','a','H']",
        explanation: "Reverse the array of characters."
      }
    ],
    tags: ["String", "Two Pointers"],
    hints: ["Try using two pointers approach.", "Swap characters from outside to inside."],
    solution: "def reverse_string(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1\n    return s",
    explanation: "This solution uses a two-pointer approach to swap characters from the outside towards the center of the string.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return mockProblem;
}

export async function getDailyChallenges(): Promise<Problem[]> {
  // This would normally fetch from Supabase
  // For now, let's return a mock list
  const challenges: Problem[] = [
    {
      id: "daily-1",
      title: "Daily Challenge: String Reversal",
      description: "Write a function that reverses a string. The input string is given as an array of characters.",
      difficulty: "Easy",
      category: "Strings",
      starterCode: "def reverse_string(s):\n    # Write your code here\n    pass",
      testCases: [],
      examples: [],
      tags: ["String", "Two Pointers"],
      hints: [],
      solution: "",
      explanation: "",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "daily-2",
      title: "Daily Challenge: Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficulty: "Easy",
      category: "Arrays",
      starterCode: "def two_sum(nums, target):\n    # Write your code here\n    pass",
      testCases: [],
      examples: [],
      tags: ["Array", "Hash Table"],
      hints: [],
      solution: "",
      explanation: "",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  return challenges;
}
