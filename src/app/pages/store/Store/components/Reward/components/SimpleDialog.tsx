import { SetStateAction, Dispatch } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface SimpleDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  coffees: number;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { setOpen, open, coffees } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ color: 'green' }}>Bien hecho!</DialogTitle>
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CoffeeIcon />
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6">Recibiste x{coffees} cafecitos</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 2 }}>
        <Button onClick={handleClose} variant="contained" color="success">
          Aceptar
        </Button>
      </Box>
    </Dialog>
  );
}

function CoffeeIcon() {
  return <img src={'/icons/coffee.svg'} style={{ width: 50, height: 50 }} />;
}
