
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
