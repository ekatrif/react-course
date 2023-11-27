import { BrowserRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import '@testing-library/jest-dom';

test('Page 404 render test', () => {
  const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };
  renderWithRouter(<App />, { route: '/404' });
  const text = screen.getByText('Error 404. Page not found.');
  expect(text).toBeInTheDocument();
});
