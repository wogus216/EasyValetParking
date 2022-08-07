import React, { useState } from 'react';

// text
import text from 'src/utils/text';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ResetPassword = () => {
  const { resetPassword } = text;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>{resetPassword.ment1}</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{resetPassword.ment2}</DialogTitle>
        <DialogContent>
          <DialogContentText>{resetPassword.ment3}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{resetPassword.ment4}</Button>
          <Button onClick={handleClose}>{resetPassword.ment5}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ResetPassword;
