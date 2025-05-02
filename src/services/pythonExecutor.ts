import { initPyodide } from './pyodideLoader';
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
    // Define a function to execute the test with proper error handling
    pyodide.runPython(`
import sys
import traceback
import inspect

def run_test(code, test_input):
    try:
        # Create a namespace
        namespace = {}
        # Execute the code in the namespace
        exec(code, namespace)
        
        # Find the function name (assuming it's the first defined function)
        function_name = None
        for name, obj in namespace.items():
            if callable(obj) and name != 'run_test':
                function_name = name
                break
                
        if function_name is None:
            raise Exception("No function defined in the code")
            
        # Get the function
        function = namespace[function_name]
        
        # Get function signature to check parameter count
        sig = inspect.signature(function)
        param_count = len(sig.parameters)
        
        # Call the function based on parameter count and input type
        if param_count == 0:
            # Function takes no parameters, ignore any input
            result = function()
        elif isinstance(test_input, list):
            # Handle array inputs with proper unpacking
            if len(test_input) == 0:
                # Empty input list but function expects parameters
                if param_count > 0:
                    raise Exception(f"Function {function_name} expects {param_count} arguments but none were provided")
                result = function()
            elif param_count == 1:
                # For single parameter functions, pass the entire list as one argument
                result = function(test_input)
            else:
                # For multi-parameter functions, unpack the list items as separate arguments
                if len(test_input) != param_count:
                    raise Exception(f"Function {function_name} expects {param_count} arguments but got {len(test_input)}")
                result = function(*test_input)
        else:
            # Single non-list argument
            if param_count > 1:
                raise Exception(f"Function {function_name} expects {param_count} arguments but got 1")
            result = function(test_input)
            
        return {
            "result": result,
            "error": None
        }
    except Exception as e:
        error_type = type(e).__name__
        error_message = str(e)
        error_traceback = traceback.format_exc()
        return {
            "result": None,
            "error": f"{error_type}: {error_message}\\n{error_traceback}"
        }
    `);
    
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
        
        const testResult = runTest(code, inputValue);
        const actualOutput = testResult.get('result');
        const error = testResult.get('error');
        
        let actualValue;
        let isPassing = false;
        
        if (error) {
          actualValue = null;
          isPassing = false;
        } else {
          // Handle JavaScript/Python type conversions
          if (actualOutput === null || actualOutput === undefined) {
            actualValue = null;
          } else if (actualOutput.toJs) {
            actualValue = actualOutput.toJs();
          } else {
            actualValue = actualOutput;
          }
          
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
        
        results.push({
          input: inputValue,
          expected: expectedOutput,
          actual: actualValue,
          passed: isPassing,
          error: error || undefined
        });
        
        if (isPassing) {
          passed++;
        } else {
          failed++;
        }
      } catch (jsError) {
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
