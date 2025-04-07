import { ServerConfiguration, ServerModel } from '../types';

export const getServerModels = (config: ServerConfiguration): ServerModel[] => {
  const { cpuType, memorySize, hasGpuAccelerator } = config;
  const models: ServerModel[] = [];

  // High Density Server Rule
  if (cpuType === 'ARM' && hasGpuAccelerator && memorySize >= 524288) {
    models.push('High Density Server');
  }

  // Mainframe Rule
  if (cpuType === 'Power' && memorySize >= 2048) {
    models.push('Mainframe');
  }

  // 4U Rack Server and Tower Server Rules
  if (memorySize >= 131072 && (cpuType === 'Power' || cpuType === 'X86')) {
    models.push('4U Rack Server', 'Tower Server');
  } else if (memorySize >= 2048 && (cpuType === 'Power' || cpuType === 'X86')) {
    models.push('Tower Server');
  }

  return models;
};