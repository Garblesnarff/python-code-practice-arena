
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
        
        # For debugging
        print(f"Function: {function_name}, Parameters: {param_count}, Input type: {type(test_input)}")
        
        # Convert test_input to Python types if it's a list
        if isinstance(test_input, list):
            # Explicit conversion to ensure it's a proper Python list
            py_input = list(test_input)
            print(f"Converted input: {py_input}, type: {type(py_input)}")
        else:
            py_input = test_input
            
        # Call the function based on parameter count and input type
        if param_count == 0:
            # Function takes no parameters, ignore any input
            result = function()
        elif isinstance(py_input, list):
            # Handle list inputs with proper unpacking
            if len(py_input) == 0:
                # Empty input list but function expects parameters
                if param_count > 0:
                    raise Exception(f"Function {function_name} expects {param_count} arguments but none were provided")
                result = function()
            elif param_count == 1:
                # Function expects one parameter - pass the list as is
                result = function(py_input)
            else:
                # For multi-parameter functions - we need special handling
                if len(py_input) == param_count:
                    # If the number of list items equals parameter count, unpack them
                    print(f"Unpacking {py_input} for {function_name}")
                    
                    # Direct approach - pass each argument individually
                    if param_count == 2:
                        result = function(py_input[0], py_input[1])
                    elif param_count == 3:
                        result = function(py_input[0], py_input[1], py_input[2])
                    elif param_count == 4:
                        result = function(py_input[0], py_input[1], py_input[2], py_input[3])
                    else:
                        # For more parameters, try unpacking or fallback
                        try:
                            result = function(*py_input)
                        except Exception as unpack_err:
                            print(f"Unpacking error: {unpack_err}")
                            # Create argument string for eval approach
                            args_str = ", ".join([repr(arg) for arg in py_input])
                            exec_str = f"result = function({args_str})"
                            print(f"Trying: {exec_str}")
                            # Use eval to unpack arguments explicitly
                            exec(exec_str, {"function": function}, locals())
                else:
                    raise Exception(f"Function {function_name} expects {param_count} arguments but got {len(py_input)}")
        else:
            # Single non-list argument
            if param_count > 1:
                raise Exception(f"Function {function_name} expects {param_count} arguments but got 1")
            result = function(py_input)
            
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
