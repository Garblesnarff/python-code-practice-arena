
import type { PyodideInterface } from 'pyodide';

// Since we're using the CDN version, we need to declare the loadPyodide function
declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

// Use the global loadPyodide function
const loadPyodide = window.loadPyodide;

let pyodideInstance: PyodideInterface | null = null;
let loading = false;
const loadingPromises: Promise<PyodideInterface>[] = [];

export const initPyodide = async (): Promise<PyodideInterface> => {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  if (loading && loadingPromises.length > 0) {
    return loadingPromises[0];
  }

  loading = true;
  const loadingPromise = loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
  });
  
  loadingPromises.push(loadingPromise);
  
  try {
    pyodideInstance = await loadingPromise;
    return pyodideInstance;
  } catch (error) {
    console.error("Failed to load Pyodide:", error);
    throw error;
  } finally {
    loading = false;
    loadingPromises.pop();
  }
};

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
        
        # Call the function with the test input
        if isinstance(test_input, list) and len(test_input) > 0 and isinstance(test_input[0], list):
            # If it's a list of arguments
            result = function(*test_input)
        else:
            # Single argument
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
