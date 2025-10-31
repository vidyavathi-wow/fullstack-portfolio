// components/common/FunctionalErrorBoundary.jsx
import { ErrorBoundary } from 'react-error-boundary';

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-red-600 p-6">
      <div className="max-w-md bg-white p-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-2">Something went wrong 😢</h2>
        <p className="text-sm mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default function FunctionalErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
}
