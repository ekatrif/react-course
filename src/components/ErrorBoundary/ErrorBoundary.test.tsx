import { render } from '@testing-library/react';
import { test, expect } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import '@testing-library/jest-dom';

const ChildComponent = () => {
  throw new Error('Test error');
};

test('renders the error message when an error occurs', () => {
  const { getByText } = render(
    <ErrorBoundary>
      <ChildComponent />
    </ErrorBoundary>
  );

  const errorMessage = getByText('Something went wrong...');
  expect(errorMessage).toBeInTheDocument();
});

test('renders the child component when no error occurs', () => {
  const { getByText } = render(
    <ErrorBoundary>
      <div>Child component</div>
    </ErrorBoundary>
  );

  const childComponent = getByText('Child component');
  expect(childComponent).toBeInTheDocument();
});
