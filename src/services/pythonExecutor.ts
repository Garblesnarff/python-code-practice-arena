
import { initPyodide } from './pyodideLoader';
import { getPythonTestRunnerCode } from './pythonTestRunner';
import { processTestResults } from './testResultProcessor';
import type { ExecutionResult, TestResult } from './testTypes';

export const executePythonCode = async (
  code: string,
  testCases: { input: any; expected_output: any }[]
): Promise<ExecutionResult> => {
  const pyodide = await initPyodide();
  
  const results: TestResult[] = [];
  let passed = 0;
  let failed = 0;

  try {
    // Load the Python test runner function
    pyodide.runPython(getPythonTestRunnerCode());
    
    const runTest = pyodide.globals.get('run_test');
    
    for (const testCase of testCases) {
      try {
        const inputValue = testCase.input;
        const expectedOutput = testCase.expected_output;
        
        // Convert JavaScript null to Python None for comparison
        if (expectedOutput === null) {
          pyodide.runPython('expected_output = None');
        } else {
          pyodide.globals.set('expected_output', expectedOutput);
        }
        
        // Log information about the test case for debugging
        console.log(`Executing test with input: ${JSON.stringify(inputValue)}`);
        
        const testResult = runTest(code, inputValue);
        const actualOutput = testResult.get('result');
        const error = testResult.get('error');
        
        // Process the test result
        const result = processTestResults(inputValue, expectedOutput, actualOutput, error);
        results.push(result);
        
        if (result.passed) {
          passed++;
        } else {
          failed++;
        }
      } catch (jsError) {
        console.error("JavaScript error during test execution:", jsError);
        results.push({
          input: testCase.input,
          expected: testCase.expected_output,
          actual: null,
          passed: false,
          error: `JavaScript Error: ${jsError.message}`
        });
        failed++;
      }
    }
  } catch (error) {
    console.error("Error executing Python code:", error);
    results.push({
      input: "N/A",
      expected: "N/A",
      actual: null,
      passed: false,
      error: `Execution Error: ${error instanceof Error ? error.message : String(error)}`
    });
    failed++;
  }

  return {
    results,
    summary: {
      passed,
      failed,
      total: passed + failed
    }
  };
};
