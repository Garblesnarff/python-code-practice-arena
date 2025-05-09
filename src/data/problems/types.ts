
export interface Example {
  input: string;
  output: string;
}

export interface TestCase {
  input: any;
  expected_output: any;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  starter_code?: string;
  solution_code?: string;
  test_cases: TestCase[];
  examples: Example[];
  hints?: string[];
  time_complexity?: string;
  space_complexity?: string;
  signature_hint?: string;
  solution?: string;
  explanation?: string;
}
