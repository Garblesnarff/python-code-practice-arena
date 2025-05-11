
export interface TestCase {
  input: any;
  expected_output: any;
  explanation?: string;
  hidden?: boolean;
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
}
