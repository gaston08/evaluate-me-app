import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { Link as RouterLink } from 'react-router-dom';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Debes iniciar sesión para resolver este éxamen.</DialogTitle>
      <Box sx={{ width: 400, p: 2 }}>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          component={RouterLink}
          to="/auth/login"
        >
          ya tengo una cuenta
        </Button>
        <Button
          color="success"
          sx={{ mt: 2 }}
          variant="contained"
          component={RouterLink}
          to="/auth/signup"
        >
          quiero crearme una cuenta gratis
        </Button>
      </Box>
    </Dialog>
  );
}
