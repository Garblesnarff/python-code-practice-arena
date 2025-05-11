
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
  initial_code: string;
  solution_code: string;
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
}

// Helper function to ensure compatibility between initial_code and starter_code
export const normalizeProblem = (problem: Problem): Problem => {
  return {
    ...problem,
    starter_code: problem.starter_code || problem.initial_code,
    initial_code: problem.initial_code || problem.starter_code
  };
};
