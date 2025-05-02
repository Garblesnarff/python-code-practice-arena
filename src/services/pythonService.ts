
// Re-export all functionality from the refactored files
export { initPyodide } from './pyodideLoader';
export { executePythonCode } from './pythonExecutor';
export { getPythonTestRunnerCode } from './pythonTestRunner';
export { processTestResults } from './testResultProcessor';
export type { TestResult, ExecutionResult } from './testTypes';
