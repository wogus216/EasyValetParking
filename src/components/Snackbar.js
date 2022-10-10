import React, { useState } from 'react';

const { Snackbar, Alert } = require('@mui/material');

const MySnackbar = ({ message, open, close }) => (
  <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open}>
    <Alert onClose={close} security="success">
      {message}
    </Alert>
  </Snackbar>
);

export default MySnackbar;
