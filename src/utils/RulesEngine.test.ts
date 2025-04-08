import { getServerModels } from './RulesEngine';
import { ServerConfiguration } from '../types';

describe('getServerModels', () => {
  it('should return High Density Server for valid ARM configuration', () => {
    const config: ServerConfiguration = { cpuType: 'ARM', memorySize: 524288, hasGpuAccelerator: true };
    expect(getServerModels(config)).toEqual(['High Density Server']);
  });

  it('should return No Options for invalid ARM configuration (low memory)', () => {
    const config: ServerConfiguration = { cpuType: 'ARM', memorySize: 262144, hasGpuAccelerator: true };
    expect(getServerModels(config)).toEqual(['No Options']);
  });

  it('should return Mainframe for valid Power configuration', () => {
    const config: ServerConfiguration = { cpuType: 'Power', memorySize: 262144, hasGpuAccelerator: false };
    expect(getServerModels(config)).toEqual(['Mainframe', '4U Rack Server', 'Tower Server']);
  });

  it('should return Tower Server and 4U Rack Server for valid X86 configuration', () => {
    const config: ServerConfiguration = { cpuType: 'X86', memorySize: 524288, hasGpuAccelerator: false };
    expect(getServerModels(config)).toEqual(['4U Rack Server', 'Tower Server']);
  });

  it('should return No Options for memory less than 2048MB', () => {
    const config: ServerConfiguration = { cpuType: 'X86', memorySize: 1024, hasGpuAccelerator: false };
    expect(getServerModels(config)).toEqual(['No Options']);
  });
});
