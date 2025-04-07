export type CPUType = 'X86' | 'Power' | 'ARM';

export interface ServerConfiguration {
  cpuType: CPUType;
  memorySize: number;
  hasGpuAccelerator: boolean;
}

export type ServerModel = 'High Density Server' | 'Mainframe' | '4U Rack Server' | 'Tower Server';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
} 