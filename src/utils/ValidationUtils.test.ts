import { validateMemorySize } from './ValidationUtils';

describe('validateMemorySize', () => {
  it('should validate memory size within range and power of 2', () => {
    expect(validateMemorySize(2048).isValid).toBe(true);
    expect(validateMemorySize(524288).isValid).toBe(true);
  });

  it('should invalidate memory size below minimum', () => {
    expect(validateMemorySize(1024).isValid).toBe(false);
  });

  it('should invalidate memory size above maximum', () => {
    expect(validateMemorySize(16777216).isValid).toBe(false);
  });

  it('should invalidate memory size not a multiple of 1024', () => {
    expect(validateMemorySize(3072).isValid).toBe(false);
  });

  it('should invalidate memory size not a power of 2 in GB', () => {
    expect(validateMemorySize(3072).isValid).toBe(false);
  });
});
