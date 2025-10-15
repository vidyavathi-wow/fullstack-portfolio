// src/components/ErrorBoundary.jsx
import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';
import Button from './common/Button/Button';
import { COLORS } from '../utils/constants';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  font-weight: bold;
  height: 100vh;
  color: ${COLORS.danger};
`;

const Card = styled.div`
  background: #fff0f0;
  border: 1px solid ${COLORS.danger};
  border-radius: 8px;
  padding: 30px 40px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Div role="alert">
      <Card>
        <p>Something went wrong:</p>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
        <Button onClick={resetErrorBoundary} variant="danger">
          Try Again
        </Button>
      </Card>
    </Div>
  );
}

const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log('Error boundary reset');
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
