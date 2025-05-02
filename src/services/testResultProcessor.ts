
import type { TestResult } from './testTypes';

/**
 * Process and compare Python execution results with expected outputs
 */
export const processTestResults = (
  testInput: any,
  expectedOutput: any,
  actualOutput: any,
  error: string | null
): TestResult => {
  let actualValue;
  let isPassing = false;
  
  if (error) {
    actualValue = null;
    isPassing = false;
    console.log(`Test error: ${error}`);
  } else {
    // Handle JavaScript/Python type conversions
    if (actualOutput === null || actualOutput === undefined) {
      actualValue = null;
    } else if (actualOutput.toJs) {
      actualValue = actualOutput.toJs();
    } else {
      actualValue = actualOutput;
    }
    
    console.log(`Expected: ${JSON.stringify(expectedOutput)}, Actual: ${JSON.stringify(actualValue)}`);
    
    // Compare with expected output
    if (expectedOutput === null && actualValue === null) {
      isPassing = true;
    } else if (Array.isArray(expectedOutput) && Array.isArray(actualValue)) {
      isPassing = JSON.stringify(expectedOutput) === JSON.stringify(actualValue);
    } else if (typeof expectedOutput === 'object' && typeof actualValue === 'object') {
      isPassing = JSON.stringify(expectedOutput) === JSON.stringify(actualValue);
    } else {
      isPassing = expectedOutput === actualValue;
    }
  }
  
  return {
    input: testInput,
    expected: expectedOutput,
    actual: actualValue,
    passed: isPassing,
    error: error || undefined
  };
};
