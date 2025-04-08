import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfigurationForm from './ConfigurationForm';

describe('ConfigurationForm', () => {
  it('should display error for invalid memory input', () => {
    render(<ConfigurationForm />);
    const memoryInput = screen.getByLabelText(/Memory Size/i);
    fireEvent.change(memoryInput, { target: { value: '1024' } });
    fireEvent.click(screen.getByText(/Find Server Models/i));
    expect(screen.getByText(/Memory size must be at least 2048 MB/i)).toBeInTheDocument();
  });

  it('should display High Density Server for valid ARM configuration', () => {
    render(<ConfigurationForm />);
    
    // Select CPU Model
    fireEvent.mouseDown(screen.getByRole('combobox', { name: /CPU Model/i }));
    fireEvent.click(screen.getByRole('option', { name: 'ARM' }));

    // Enter Memory Size
    fireEvent.change(screen.getByLabelText(/Memory Size/i), { target: { value: '524288' } });

    // Check GPU Accelerator
    fireEvent.click(screen.getByRole('checkbox', { name: /GPU Accelerator Card/i }));

    // Submit the form
    fireEvent.click(screen.getByText(/Find Server Models/i));

    // Assert the result
    expect(screen.getByText(/High Density Server/i)).toBeInTheDocument();
  });

  it('should display Mainframe for valid Power configuration', () => {
    render(<ConfigurationForm />);
    
    // Select CPU Model
    fireEvent.mouseDown(screen.getByRole('combobox', { name: /CPU Model/i }));
    fireEvent.click(screen.getByRole('option', { name: 'Power' }));

    // Enter Memory Size
    fireEvent.change(screen.getByLabelText(/Memory Size/i), { target: { value: '262144' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Find Server Models/i));

    // Assert the result
    expect(screen.getByText(/Mainframe/i)).toBeInTheDocument();
  });

  it('should display No Options for invalid configuration', async () => {
    render(<ConfigurationForm />);
    
    // Select CPU Model
    fireEvent.mouseDown(screen.getByRole('combobox', { name: /CPU Model/i }));
    fireEvent.click(screen.getByRole('option', { name: 'X86' }));

    // Enter Memory Size
    fireEvent.change(screen.getByLabelText(/Memory Size/i), { target: { value: '1024' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Find Server Models/i));

    // Assert the result using a custom matcher
    expect(
      await screen.findByText((content, element) => 
        content.includes('No Options') && element?.tagName === 'P'
      )
    ).toBeInTheDocument();
  });
});
