import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { ServerModel } from '../types';

interface ResultsDisplayProps {
  models: ServerModel[];
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ models }) => {
  if (models.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h6" color="text.secondary">
          No Options
        </Typography>
      </Box>
    );
  }

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