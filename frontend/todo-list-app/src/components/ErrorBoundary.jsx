// src/components/ErrorBoundary.jsx
import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: "20px", color: "red" }}>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}


const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log("Error boundary reset");
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
