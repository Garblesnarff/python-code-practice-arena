
export interface TestCase {
  input: any;
  expected_output: any;
  explanation?: string;
  hidden?: boolean;
}

export interface Example {
  input: any;
  output: any;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  initial_code?: string;
  solution_code?: string;
  test_cases: TestCase[];
  category?: string;
  subcategory?: string;
  tags?: string[];
  course_id?: string;
  topic_id?: string;
  // Additional fields needed by components
  signature_hint?: string;
  examples?: Example[];
  explanation?: string;
  solution?: string;
  hints?: string[];
  starter_code?: string; // Alias for initial_code
  time_complexity?: string; // Added for course-2-problems.ts
  space_complexity?: string; // Added for course-2-problems.ts
}

// Helper function to ensure compatibility between initial_code and starter_code
export const normalizeProblem = (problem: any): Problem => {
  // Create a normalized copy of the problem
  const normalized: Problem = { ...problem };

  // Handle starter_code <-> initial_code mapping
  if (problem.starter_code && !problem.initial_code) {
    normalized.initial_code = problem.starter_code;
  } else if (problem.initial_code && !problem.starter_code) {
    normalized.starter_code = problem.initial_code;
  } else if (!problem.starter_code && !problem.initial_code) {
    // If neither exists, set both to empty string to avoid errors
    normalized.initial_code = "";
    normalized.starter_code = "";
  }

  // Handle solution <-> solution_code mapping
  if (problem.solution && !problem.solution_code) {
    normalized.solution_code = problem.solution;
  } else if (problem.solution_code && !problem.solution) {
    normalized.solution = problem.solution_code;
  } else if (!problem.solution && !problem.solution_code) {
    // If neither exists, set both to empty string to avoid errors
    normalized.solution_code = "";
    normalized.solution = "";
  }

  return normalized;
};
