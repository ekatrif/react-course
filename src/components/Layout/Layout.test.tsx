import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import '@testing-library/jest-dom';

test('renders Layout component correctly', () => {
  render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );

  expect(screen.getByText('Main')).toBeInTheDocument();

  expect(screen.getByText('2023 RS School Ekatrif')).toBeInTheDocument();
});
