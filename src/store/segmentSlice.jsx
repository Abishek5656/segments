import { createSlice } from '@reduxjs/toolkit';

// Define all available schemas
const allSchemas = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' }
];

const initialState = {
  segmentName: '',
  selectedSchemas: [],
  availableSchemas: [...allSchemas] // Start with all schemas available
};

const segmentSlice = createSlice({
  name: 'segment',
  initialState,
  reducers: {
    setSegmentName: (state, action) => {
      state.segmentName = action.payload;
    },
    addSchema: (state, action) => {
      const schema = action.payload;
      state.selectedSchemas.push(schema);
      // Remove from available schemas
      state.availableSchemas = state.availableSchemas.filter(
        s => s.value !== schema.value
      );
    },
    updateSchema: (state, action) => {
      const { index, newSchema } = action.payload;
      const oldSchema = state.selectedSchemas[index];
      
      // Add old schema back to available schemas
      if (oldSchema && oldSchema.value !== newSchema.value) {
        state.availableSchemas.push(oldSchema);
      }
      
      // Update selected schema
      state.selectedSchemas[index] = newSchema;
      
      // Remove new schema from available schemas
      state.availableSchemas = state.availableSchemas.filter(
        s => s.value !== newSchema.value
      );
    },
    removeSchema: (state, action) => {
      const index = action.payload;
      const removedSchema = state.selectedSchemas[index];
      
      if (removedSchema) {
        state.availableSchemas.push(removedSchema);
      }
      
      state.selectedSchemas.splice(index, 1);
    },
    resetSchemas: (state) => {
      // Reset to initial state
      state.selectedSchemas = [];
      state.availableSchemas = [...allSchemas];
      state.segmentName = '';
    }
  }
});

export const { setSegmentName, addSchema, updateSchema, removeSchema, resetSchemas } = segmentSlice.actions;
export default segmentSlice.reducer;