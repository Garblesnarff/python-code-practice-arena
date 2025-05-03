
/**
 * Python code for the test runner that will be executed in Pyodide
 */
export const getPythonTestRunnerCode = (): string => {
  return `
import sys
import traceback
import inspect
import json

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

        # Convert JsProxy to Python list if necessary before checks
        if hasattr(test_input, 'to_py'):
             test_input = test_input.to_py()
        
        # For debugging
        print(f"Function: {function_name}, Parameters: {param_count}, Input type: {type(test_input)}, Input value: {test_input}")
        
        # Handle different input types and parameter counts
        if param_count == 0:
            # Function takes no parameters
            result = function()
        elif isinstance(test_input, list):
            # Input is a list
            if param_count == 1:
                # Function expects a single parameter.
                # If input is a list of size 1, pass the element. Otherwise, pass the list.
                if len(test_input) == 1:
                    result = function(test_input[0]) 
                else:
                    # Pass the whole list if it has multiple elements (or is empty, though unlikely for test cases)
                    result = function(test_input)
            elif len(test_input) == param_count:
                # Function expects multiple parameters that match list length
                # Direct unpacking based on parameter count for common cases
                if param_count == 2:
                    result = function(test_input[0], test_input[1])
                elif param_count == 3:
                    result = function(test_input[0], test_input[1], test_input[2])
                elif param_count == 4:
                    result = function(test_input[0], test_input[1], test_input[2], test_input[3])
                else:
                    # For functions with more parameters, use string-based argument passing
                    # This is more reliable than *args unpacking when crossing the JS-Python bridge
                    args_str = ", ".join(repr(arg) for arg in test_input)
                    print(f"Using explicit arguments: {args_str}")
                    # Use locals() to capture the result in the local scope
                    exec(f"result = function({args_str})", {"function": function}, locals())
            else:
                raise Exception(f"Function {function_name} expects {param_count} arguments but got {len(test_input)}")
        else:
            # Input is a single value (not a list)
            if param_count == 1:
                result = function(test_input)
            else:
                raise Exception(f"Function {function_name} expects {param_count} arguments but got 1")
        
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
`;
};
