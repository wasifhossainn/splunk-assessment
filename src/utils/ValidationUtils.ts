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
  // Check minimum requirement
  if (memorySize < MIN_MEMORY) {
    return {
      isValid: false,
      message: `Memory size must be at least ${formatMemorySize(MIN_MEMORY)} MB`
    };
  }

  // Check maximum limit
  if (memorySize > MAX_MEMORY) {
    return {
      isValid: false,
      message: `Memory size cannot exceed ${formatMemorySize(MAX_MEMORY)} MB`
    };
  }

  // Check if multiple of 1024
  if (memorySize % 1024 !== 0) {
    return {
      isValid: false,
      message: 'Memory size must be a multiple of 1,024 MB'
    };
  }

  // Check if power of 2
  const isPowerOfTwo = (n: number): boolean => {
    if (n === 0) return false;
    return (n & (n - 1)) === 0;
  };

  if (!isPowerOfTwo(memorySize / 1024)) {
    return {
      isValid: false,
      message: 'Memory size must be a power of 2 (in GB)'
    };
  }

  return { isValid: true };
}; 