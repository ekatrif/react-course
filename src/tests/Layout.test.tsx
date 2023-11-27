import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from '../components/Layout';
import '@testing-library/jest-dom';

test('renders Layout component correctly', () => {
  render(<Layout>{null}</Layout>);

  expect(screen.getByText('Main')).toBeInTheDocument();

  expect(screen.getByText('2023 RS School Ekatrif')).toBeInTheDocument();
});
