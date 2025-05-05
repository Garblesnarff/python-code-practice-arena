
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
  signature_hint: string;
  examples: Example[];
  test_cases: TestCase[];
  starter_code?: string;
  solution?: string;
  explanation?: string;
}
