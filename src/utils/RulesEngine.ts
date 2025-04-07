import { ServerConfiguration, ServerModel } from '../types';

const HIGH_DENSITY_MEMORY_REQUIREMENT = 524288; // 524,288MB
const RACK_TOWER_MEMORY_THRESHOLD = 131072; // 131,072MB

export const getServerModels = (config: ServerConfiguration): ServerModel[] => {
  const { cpuType, memorySize, hasGpuAccelerator } = config;
  const models: ServerModel[] = [];

  // High Density Server Rules
  if (hasGpuAccelerator && cpuType === 'ARM' && memorySize >= 524288) {
    models.push('High Density Server');
  }

  // Mainframe Rules
  if (cpuType === 'Power' && memorySize >= 2048) {
    models.push('Mainframe');
  }

  // 4U Rack Server & Tower Server Rules
  if (memorySize >= 131072) {
    if (cpuType === 'Power' || cpuType === 'X86') {
      models.push('4U Rack Server');
      models.push('Tower Server');
    }
  } else if (memorySize >= 2048) {
    if (cpuType === 'Power' || cpuType === 'X86') {
      models.push('Tower Server');
    }
  }

  return models;
}; 