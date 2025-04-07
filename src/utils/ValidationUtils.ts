import { ValidationResult } from '../types/index';

export const MIN_MEMORY = 2048; // 2,048 MB
export const MAX_MEMORY = 8388608; // 8,388,608 MB

export const formatMemorySize = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parseMemoryInput = (input: string): number | null => {
  // Remove all commas and whitespace
  const cleanedInput = input.replace(/,|\s/g, '');
  const number = parseInt(cleanedInput, 10);
  return isNaN(number) ? null : number;
};

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
  if ((memorySize / 1024) & ((memorySize / 1024) - 1)) {
    return { isValid: false, message: 'Memory size must be a power of 2 (in GB)' };
  }
  return { isValid: true };
};