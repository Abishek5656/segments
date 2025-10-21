import React, { useState } from 'react';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { Save } from '@mui/icons-material';
import SaveSegmentPopup from './SaveSegmentPopup';

const SegmentBuilder = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          textAlign: 'center',
          border: '1px solid #e0e0e0',
          borderRadius: 2
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          View Audience
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => setIsPopupOpen(true)}
          size="large"
          sx={{ 
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }}
        >
          Save segment
        </Button>
      </Paper>

      <SaveSegmentPopup 
        open={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </Container>
  );
};

export default SegmentBuilder;