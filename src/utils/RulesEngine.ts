import { ServerConfiguration, ServerModel } from '../types';

/**
 * Determines the server models that match the given configuration.
 * 
 * @param config - The server configuration.
 * @returns An array of matching server models.
 */
export const getServerModels = (config: ServerConfiguration): ServerModel[] => {
  const { cpuType, memorySize, hasGpuAccelerator } = config;
  const models: ServerModel[] = [];

  // Rule: High Density Server
  if (cpuType === 'ARM' && hasGpuAccelerator && memorySize >= 524288) {
    models.push('High Density Server');
  }

  // Rule: Mainframe
  if (cpuType === 'Power' && memorySize >= 2048) {
    models.push('Mainframe');
  }

  // Rule: 4U Rack Server and Tower Server
  if (memorySize >= 131072 && (cpuType === 'Power' || cpuType === 'X86')) {
    models.push('4U Rack Server', 'Tower Server');
  } else if (memorySize >= 2048 && (cpuType === 'Power' || cpuType === 'X86')) {
    models.push('Tower Server');
  }

  // Default Rule: No Options
  if (models.length === 0) {
    models.push('No Options');
  }

  return models;
};