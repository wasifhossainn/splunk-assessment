import { ValidationResult } from '../types/index';

// Constants for memory validation
export const MIN_MEMORY = 2048; // Minimum memory size in MB
export const MAX_MEMORY = 8388608; // Maximum memory size in MB (8 GB)

/**
 * Formats a memory size value into a human-readable string with commas.
 * 
 * @param value - The memory size in MB.
 * @returns The formatted memory size string.
 */
export const formatMemorySize = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Parses a memory input string into a number.
 * 
 * @param input - The memory input string (e.g., "2,048").
 * @returns The parsed memory size as a number, or null if invalid.
 */
export const parseMemoryInput = (input: string): number | null => {
  const cleanedInput = input.replace(/,|\s/g, ''); // Remove commas and whitespace
  const number = parseInt(cleanedInput, 10);
  return isNaN(number) ? null : number;
};

/**
 * Validates a memory size value.
 * 
 * @param memorySize - The memory size in MB.
 * @returns A ValidationResult indicating whether the memory size is valid.
 */
export const validateMemorySize = (memorySize: number): ValidationResult => {
  if (memorySize < MIN_MEMORY) {
    return { isValid: false, message: `Memory size must be at least ${MIN_MEMORY} MB` };
  }
  if (memorySize > MAX_MEMORY) {
    return { isValid: false, message: `Memory size cannot exceed ${MAX_MEMORY} MB` };
  }
  if (memorySize % 1024 !== 0) {
    return { isValid: false, message: 'Memory size must be a multiple of 1,024 MB' };
  }
  const gbSize = memorySize / 1024;
  if ((gbSize & (gbSize - 1)) !== 0) {
    return { isValid: false, message: 'Memory size must be a power of 2 (in GB)' };
  }
  return { isValid: true };
};