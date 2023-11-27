import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import ErrorPage from '../pages/404';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('ErrorPage', () => {
  mockRouter.push('/initial-path');
  test('renders correctly', () => {
    render(<ErrorPage />);

    expect(screen.getByText('Error 404. Page not found.')).toBeInTheDocument();
  });
});
