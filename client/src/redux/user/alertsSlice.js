// Redux slice file (e.g., alertsSlice.js)

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  // Other initial state properties...
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    },
    // Other reducers...
  },
});

export const { showLoading, hideLoading } = alertsSlice.actions;

export default alertsSlice.reducer;
