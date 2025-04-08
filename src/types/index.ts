/**
 * Supported CPU types for server configurations.
 */
export type CPUType = 'X86' | 'Power' | 'ARM';

/**
 * Represents the configuration of a server.
 */
export interface ServerConfiguration {
  cpuType: CPUType; // Type of CPU
  memorySize: number; // Memory size in MB
  hasGpuAccelerator: boolean; // Whether a GPU accelerator is included
}

/**
 * Possible server models that can be returned based on the configuration.
 */
export type ServerModel = 'High Density Server' | 'Mainframe' | '4U Rack Server' | 'Tower Server' | 'No Options';

/**
 * Represents the result of a validation operation.
 */
export interface ValidationResult {
  isValid: boolean; // Whether the validation passed
  message?: string; // Optional error message if validation failed
}