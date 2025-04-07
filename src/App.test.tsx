import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ConfigurationForm component', () => {
  render(<App />);
  expect(screen.getByText(/Server Configuration/i)).toBeInTheDocument();
});

test('renders theme correctly', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /Find Server Models/i });
  expect(button).toHaveStyle('background-color: rgb(25, 118, 210)');
});

test('renders CssBaseline for global styles', () => {
  render(<App />);
  const body = document.body;
  expect(body).toHaveStyle('background-color: #ffffff'); // Assuming light mode
});
