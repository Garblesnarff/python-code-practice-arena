
import { ExecutionResult, TestResult } from '../services/pythonService';

interface TestResultsProps {
  results: ExecutionResult | null;
}

const formatValue = (value: any): string => {
  if (value === null) {
    return 'None';
  } else if (value === undefined) {
    return 'undefined';
  } else if (Array.isArray(value)) {
    return JSON.stringify(value);
  } else if (typeof value === 'object') {
    return JSON.stringify(value);
  } else {
    return String(value);
  }
};

const TestResultItem: React.FC<{ result: TestResult; index: number }> = ({ result, index }) => {
  const { passed, input, expected, actual, error } = result;

  return (
    <div className={`mb-3 p-3 rounded-md ${passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
      <div className="flex items-center justify-between">
        <div className="font-medium">
          Test {index + 1}: {passed ? 'Passed' : 'Failed'}
        </div>
        <div className={`px-2 py-1 rounded text-xs font-bold ${passed ? 'bg-success text-white' : 'bg-error text-white'}`}>
          {passed ? 'PASS' : 'FAIL'}
        </div>
      </div>
      
      <div className="mt-2">
        <div className="font-medium text-sm">Input:</div>
        <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded mt-1 overflow-x-auto">
          <code>{formatValue(input)}</code>
        </div>
      </div>

      <div className="mt-2">
        <div className="font-medium text-sm">Expected Output:</div>
        <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded mt-1 overflow-x-auto">
          <code>{formatValue(expected)}</code>
        </div>
      </div>

      {!passed && (
        <div className="mt-2">
          <div className="font-medium text-sm">Your Output:</div>
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded mt-1 overflow-x-auto">
            <code>{error ? 'Error: ' + error : formatValue(actual)}</code>
          </div>
        </div>
      )}
    </div>
  );
};

const TestResults: React.FC<TestResultsProps> = ({ results }) => {
  if (!results) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No test results yet. Click "Run Tests" to check your solution.</p>
      </div>
    );
  }

  const { summary, results: testResults } = results;

  return (
    <div className="p-4 h-full overflow-auto">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Test Results</h2>
          <div className="text-sm">
            Passed: <span className="font-bold text-success">{summary.passed}</span> / <span className="font-bold">{summary.total}</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
          <div 
            className={`h-2.5 rounded-full ${summary.passed === summary.total ? 'bg-success' : 'bg-primary'}`}
            style={{ width: `${(summary.passed / summary.total) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-1">
        {testResults.map((result, index) => (
          <TestResultItem key={index} result={result} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TestResults;
