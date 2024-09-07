import { SetStateAction, Dispatch, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Confetti from 'app/components/Confetti';
import CoffeeIconSvg from 'assets/icons/coffee.svg';

export interface SimpleDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { setOpen, open } = props;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const audio = new Audio('/success.mp3');
      audio.play().catch(console.error);
    }
  }, [open]);

  return (
    <>
      <Dialog onClose={handleClose} open={open} sx={{ zIndex: 1 }}>
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
            <Typography variant="h6">Recibiste tus cafecitos</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 2 }}>
          <Button onClick={handleClose} variant="contained" color="success">
            Aceptar
          </Button>
        </Box>
      </Dialog>
      {open ? <Confetti confetties={700} /> : null}
    </>
  );
}

function CoffeeIcon() {
  return <img src={CoffeeIconSvg} style={{ width: 50, height: 50 }} />;
}
