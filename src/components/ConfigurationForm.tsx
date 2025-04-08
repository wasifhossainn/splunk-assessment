import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Paper,
  SelectChangeEvent,
  FormHelperText,
} from '@mui/material';
import { CPUType, ServerConfiguration } from '../types';
import { validateMemorySize, parseMemoryInput, formatMemorySize } from '../utils/ValidationUtils';
import { getServerModels } from '../utils/RulesEngine';

/**
 * ConfigurationForm Component
 * 
 * This component allows users to configure server models by selecting a CPU type,
 * entering memory size, and optionally enabling a GPU accelerator card. It validates
 * user inputs and displays available server models or error messages based on the configuration.
 */
const ConfigurationForm: React.FC = () => {
  // State for managing the server configuration
  const [config, setConfig] = useState<ServerConfiguration>({
    cpuType: 'X86',
    memorySize: 2048,
    hasGpuAccelerator: false,
  });

  // State for managing memory input as a string
  const [memoryInput, setMemoryInput] = useState<string>('2,048');

  // State for managing validation errors
  const [error, setError] = useState<string>('');

  // State for managing the list of server models
  const [serverModels, setServerModels] = useState<string[]>([]);

  // State for managing error messages displayed to the user
  const [errorMessage, setErrorMessage] = useState<string>('');

  // State for managing the result message
  const [result, setResult] = useState<string>('');

  /**
   * Handles changes to the memory input field.
   * Validates the input and updates the state accordingly.
   * 
   * @param e - The change event from the input field.
   */
  const handleMemoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setMemoryInput(input);

    // Clear error when user starts typing
    if (error) setError('');

    // Try to parse and format the input
    const parsedValue = parseMemoryInput(input);
    if (parsedValue !== null) {
      const validation = validateMemorySize(parsedValue);
      if (validation.isValid) {
        setMemoryInput(formatMemorySize(parsedValue));
      } else {
        setError(validation.message || 'Invalid memory size');
      }
    } else {
      setError('Please enter a valid number');
    }
  };

  /**
   * Handles form submission.
   * Validates the configuration and fetches matching server models.
   * 
   * @param e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Parse and validate memory input
    const parsedMemory = parseMemoryInput(memoryInput);
    if (parsedMemory === null) {
      setError('Please enter a valid number');
      setResult('');
      setErrorMessage('No Options');
      return;
    }

    const validation = validateMemorySize(parsedMemory);
    if (!validation.isValid) {
      setError(validation.message || 'Invalid memory size');
      setResult('');
      setErrorMessage('No Options');
      return;
    }

    // Update configuration and fetch server models
    const newConfig = { ...config, memorySize: parsedMemory };
    setConfig(newConfig);
    const models = getServerModels(newConfig);

    if (models.length > 0) {
      setServerModels(models);
      setErrorMessage('');
      setResult('');
    } else {
      setServerModels(['No Options']);
      setErrorMessage('No Options');
      setResult('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Server Configuration
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {/* CPU Model Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="cpu-model-label" htmlFor="cpu-model">CPU Model</InputLabel>
          <Select
            id="cpu-model"
            labelId="cpu-model-label"
            value={config.cpuType}
            label="CPU Model"
            onChange={(e: SelectChangeEvent<string>) => setConfig({ ...config, cpuType: e.target.value as CPUType })}
            inputProps={{ 'aria-labelledby': 'cpu-model-label' }} // Ensure accessibility
          >
            <MenuItem value="X86">X86</MenuItem>
            <MenuItem value="Power">Power</MenuItem>
            <MenuItem value="ARM">ARM</MenuItem>
          </Select>
        </FormControl>

        {/* Memory Size Input */}
        <FormControl fullWidth error={!!error} sx={{ mb: 2 }}>
          <TextField
            id="memory-size"
            label="Memory Size (MB)"
            value={memoryInput}
            onChange={handleMemoryChange}
            error={!!error}
            placeholder="Enter memory size (e.g., 2,048)"
            inputProps={{ 'aria-labelledby': 'memory-size-label' }}
          />
          {error && (
            <FormHelperText id="memory-size-error" error>
              {error}
            </FormHelperText>
          )}
        </FormControl>

        {/* GPU Accelerator Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              id="gpu-accelerator"
              checked={config.hasGpuAccelerator}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfig({ ...config, hasGpuAccelerator: e.target.checked })}
              inputProps={{ 'aria-labelledby': 'gpu-accelerator-label' }} // Ensure accessibility
            />
          }
          label="GPU Accelerator Card"
          labelPlacement="end" // Ensure proper association
          sx={{ mb: 2 }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2, backgroundColor: 'rgb(25, 118, 210)' }} // Explicitly set the background color
        >
          Find Server Models
        </Button>

        {/* Error Message */}
        {errorMessage && <p>{errorMessage}</p>}

        {/* Result Message */}
        {result && <p>{result}</p>}

        {/* Server Models List */}
        {serverModels.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Available Server Models:
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              {serverModels.map((model, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  color={model === 'No Options' ? 'error' : 'inherit'}
                  sx={{ mb: index < serverModels.length - 1 ? 1 : 0 }}
                >
                  {model}
                </Typography>
              ))}
            </Paper>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ConfigurationForm;