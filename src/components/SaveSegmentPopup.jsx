import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Close, Add } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setSegmentName, addSchema, updateSchema, removeSchema, resetSchemas } from '../store/segmentSlice';

const SaveSegmentPopup = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { segmentName, selectedSchemas, availableSchemas } = useSelector(state => state.segment);
  const [selectedSchema, setSelectedSchema] = useState('');

  const handleSaveSegment = async () => {
    if (!segmentName.trim()) {
      alert('Please enter a segment name');
      return;
    }

    if (selectedSchemas.length === 0) {
      alert('Please add at least one schema');
      return;
    }

    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => ({
        [schema.value]: schema.label
      }))
    };

    console.log('Saving segment:', payload);

    try {
      const webhookUrl = 'https://webhook.site/your-unique-url-here';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Segment saved successfully!');
        dispatch(resetSchemas());
        onClose();
      } else {
        alert('Failed to save segment');
      }
    } catch (error) {
      console.error('Error saving segment:', error);
      alert('Error saving segment');
    }
  };

  const handleAddSchema = () => {
    if (!selectedSchema) {
      alert('Please select a schema');
      return;
    }

    const schemaToAdd = availableSchemas.find(s => s.value === selectedSchema);
    if (schemaToAdd) {
      dispatch(addSchema(schemaToAdd));
      setSelectedSchema('');
    }
  };

  const handleSchemaChange = (index, newValue) => {
    const newSchema = availableSchemas.find(s => s.value === newValue);
    if (newSchema) {
      dispatch(updateSchema({ index, newSchema }));
    }
  };

  const getAvailableOptionsForDropdown = (currentIndex) => {
    const otherSelectedValues = selectedSchemas
      .filter((_, index) => index !== currentIndex)
      .map(s => s.value);
    
    const allOptions = [
      { label: 'First Name', value: 'first_name' },
      { label: 'Last Name', value: 'last_name' },
      { label: 'Gender', value: 'gender' },
      { label: 'Age', value: 'age' },
      { label: 'Account Name', value: 'account_name' },
      { label: 'City', value: 'city' },
      { label: 'State', value: 'state' }
    ];
    
    return allOptions.filter(option => 
      !otherSelectedValues.includes(option.value) || 
      option.value === selectedSchemas[currentIndex]?.value
    );
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1,
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Save segment
          </Typography>
          <IconButton 
            onClick={onClose}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        {/* Segment Name Section */}
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
          Enter the Name of the Segment
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Name of the segment"
          value={segmentName}
          onChange={(e) => dispatch(setSegmentName(e.target.value))}
          sx={{ mb: 3 }}
        />
        
        {/* Schema Building Section */}
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
          To save your segment, you need to add the schemas<br />
          to build the query
        </Typography>

        {/* User Traits and Group Traits Links */}
        <Box sx={{ mb: 3 }}>
          <List dense sx={{ py: 0 }}>
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemText 
                primary={
                  <Typography 
                    component="a" 
                    href="#" 
                    sx={{ 
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    - User Traits
                  </Typography>
                } 
              />
            </ListItem>
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemText 
                primary={
                  <Typography 
                    component="a" 
                    href="#" 
                    sx={{ 
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    - Group Traits
                  </Typography>
                } 
              />
            </ListItem>
          </List>
        </Box>

        {/* Pre-defined Schema Options */}
        <Box sx={{ mb: 3 }}>
          <List dense>
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemText 
                primary={
                  <Typography 
                    sx={{ 
                      color: 'primary.main',
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                    onClick={() => {
                      const firstnameSchema = availableSchemas.find(s => s.value === 'first_name');
                      if (firstnameSchema) {
                        dispatch(addSchema(firstnameSchema));
                      }
                    }}
                  >
                    - First Name
                  </Typography>
                } 
              />
            </ListItem>
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemText 
                primary={
                  <Typography 
                    sx={{ 
                      color: 'primary.main',
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                    onClick={() => {
                      const accountSchema = availableSchemas.find(s => s.value === 'account_name');
                      if (accountSchema) {
                        dispatch(addSchema(accountSchema));
                      }
                    }}
                  >
                    - Account Name
                  </Typography>
                } 
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Selected Schemas Display */}
        <Box 
          sx={{ 
            border: '2px dashed #e0e0e0',
            borderRadius: 1, 
            p: 2, 
            mb: 3,
            minHeight: 120,
            backgroundColor: '#fafafa'
          }}
        >
          {selectedSchemas.length === 0 ? (
            <Typography 
              color="text.secondary" 
              align="center" 
              sx={{ 
                lineHeight: '120px',
                fontStyle: 'italic'
              }}
            >
              No schemas added yet
            </Typography>
          ) : (
            selectedSchemas.map((schema, index) => (
              <Box 
                key={index} 
                sx={{ 
                  mb: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  p: 1,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  border: '1px solid #e0e0e0'
                }}
              >
                <FormControl size="small" sx={{ minWidth: 120, flexGrow: 1 }}>
                  <Select
                    value={schema.value}
                    onChange={(e) => handleSchemaChange(index, e.target.value)}
                    sx={{ 
                      backgroundColor: 'white',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                    }}
                  >
                    {getAvailableOptionsForDropdown(index).map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton 
                  size="small" 
                  onClick={() => dispatch(removeSchema(index))}
                  color="error"
                  sx={{ 
                    backgroundColor: '#ffebee',
                    '&:hover': { backgroundColor: '#ffcdd2' }
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            ))
          )}
        </Box>

        {/* Add Schema Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="schema-select-label">Add schema to segment</InputLabel>
            <Select
              labelId="schema-select-label"
              value={selectedSchema}
              label="Add schema to segment"
              onChange={(e) => setSelectedSchema(e.target.value)}
            >
              <MenuItem value="">
                <em>Select a schema</em>
              </MenuItem>
              {availableSchemas.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button
            startIcon={<Add />}
            onClick={handleAddSchema}
            variant="outlined"
            disabled={!selectedSchema}
            sx={{ 
              whiteSpace: 'nowrap',
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.light',
                color: 'primary.dark'
              }
            }}
          >
            Add new schema
          </Button>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, gap: 2, justifyContent: 'flex-end' }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          size="large"
          sx={{ 
            minWidth: 120,
            borderColor: 'text.secondary',
            color: 'text.secondary'
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSaveSegment} 
          variant="contained" 
          size="large"
          disabled={!segmentName.trim() || selectedSchemas.length === 0}
          sx={{ 
            minWidth: 160,
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }}
        >
          Save the Segment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveSegmentPopup;