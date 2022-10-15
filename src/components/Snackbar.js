import React, { useState } from 'react';

const { Snackbar, Alert } = require('@mui/material');

const MySnackbar = ({ message, open, close, severity }) => (
  <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open}>
    <Alert onClose={close} severity={severity ? 'success' : 'error'}>
      {message}
    </Alert>
  </Snackbar>
);

export default MySnackbar;
