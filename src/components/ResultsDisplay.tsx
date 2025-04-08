import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { ServerModel } from '../types';

/**
 * Props for the ResultsDisplay component.
 */
interface ResultsDisplayProps {
  /**
   * List of server models to display.
   */
  models: ServerModel[];
}

/**
 * ResultsDisplay Component
 * 
 * This component is responsible for displaying the list of server models
 * based on the configuration provided. If no models are available, it displays
 * a "No Options" message.
 * 
 * @param models - Array of server models to display.
 */
export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ models }) => {
  // If no models are available, display a "No Options" message
  if (models.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h6" color="text.secondary">
          No Options
        </Typography>
      </Box>
    );
  }

  // Display the list of server models
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Matching Server Models:
      </Typography>
      <List>
        {models.map((model, index) => (
          <ListItem key={index}>
            <ListItemText primary={model} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};