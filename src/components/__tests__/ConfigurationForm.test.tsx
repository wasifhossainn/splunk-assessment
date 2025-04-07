import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfigurationForm from '../ConfigurationForm';

describe('ConfigurationForm', () => {
  beforeEach(() => {
    render(<ConfigurationForm />);
  });

  it('renders all form elements', () => {
    expect(screen.getByRole('combobox', { name: /CPU Model/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Memory Size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GPU Accelerator Card/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Find Server Models/i })).toBeInTheDocument();
  });

  it('validates memory size input', () => {
    const memoryInput = screen.getByLabelText(/Memory Size/i);
    fireEvent.change(memoryInput, { target: { value: '1024' } });
    fireEvent.click(screen.getByRole('button', { name: /Find Server Models/i }));
    expect(screen.getByText(/Memory size must be at least 2,048 MB/i)).toBeInTheDocument();
  });

  it('displays High Density Server for ARM CPU with GPU and sufficient memory', () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: /CPU Model/i }), 'ARM');
    fireEvent.change(screen.getByLabelText(/Memory Size/i), { target: { value: '524,288' } });
    fireEvent.click(screen.getByLabelText(/GPU Accelerator Card/i));
    fireEvent.click(screen.getByRole('button', { name: /Find Server Models/i }));
    expect(screen.getByText('High Density Server')).toBeInTheDocument();
  });

  it('displays No Options for invalid configuration', () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: /CPU Model/i }), 'Power');
    fireEvent.change(screen.getByLabelText(/Memory Size/i), { target: { value: '1,024' } });
    fireEvent.click(screen.getByRole('button', { name: /Find Server Models/i }));
    expect(screen.getByText('No Options')).toBeInTheDocument();
  });
});