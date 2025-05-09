
import { supabase } from '@/integrations/supabase/client';
import { Problem } from '@/data/problems/types';
import { DailyChallenge } from '@/types/dailyChallenge';

// Sample daily challenge
const sampleChallenge: Problem = {
  id: 'daily-01',
  title: 'Sum of Numbers',
  description: 'Write a function that returns the sum of two numbers.',
  difficulty: 'easy',
  hints: [
    'Use the + operator to add numbers',
    'Remember to return the result'
  ],
  starter_code: 'def sum_numbers(a, b):\n    # Your code here\n    pass',
  solution_code: 'def sum_numbers(a, b):\n    return a + b',
  test_cases: [
    {
      input: [1, 2],
      expected_output: 3,
    },
    {
      input: [5, 5],
      expected_output: 10,
    },
    {
      input: [-1, 1],
      expected_output: 0,
    },
    {
      input: [0, 0],
      expected_output: 0,
    },
  ],
  examples: [
    {
      input: [2, 3],
      expected_output: 5,
    },
    {
      input: [10, 20],
      expected_output: 30,
    },
  ],
  time_complexity: 'O(1)',
  space_complexity: 'O(1)',
};

/**
 * Fetches today's daily challenge
 */
export const getDailyChallenges = async (): Promise<Problem> => {
  try {
    // In a real implementation, we would fetch from the database
    // For now, return a sample challenge
    return {
      id: 'daily-01',
      title: 'Sum of Numbers',
      description: 'Write a function that returns the sum of two numbers.',
      difficulty: 'easy',
      hints: [
        'Use the + operator to add numbers',
        'Remember to return the result'
      ],
      starter_code: 'def sum_numbers(a, b):\n    # Your code here\n    pass',
      solution_code: 'def sum_numbers(a, b):\n    return a + b',
      test_cases: [
        {
          input: [1, 2],
          expected_output: 3,
        },
        {
          input: [5, 5],
          expected_output: 10,
        },
        {
          input: [-1, 1],
          expected_output: 0,
        },
        {
          input: [0, 0],
          expected_output: 0,
        },
      ],
      examples: [
        {
          input: [2, 3],
          expected_output: 5,
        },
        {
          input: [10, 20],
          expected_output: 30,
        },
      ],
      time_complexity: 'O(1)',
      space_complexity: 'O(1)',
    };
  } catch (error) {
    console.error('Error fetching daily challenge:', error);
    throw error;
  }
};

