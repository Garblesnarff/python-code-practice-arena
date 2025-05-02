
export interface TestResult {
  input: any;
  expected: any;
  actual: any;
  passed: boolean;
  error?: string;
}

export interface ExecutionResult {
  results: TestResult[];
  summary: {
    passed: number;
    failed: number;
    total: number;
  };
}
