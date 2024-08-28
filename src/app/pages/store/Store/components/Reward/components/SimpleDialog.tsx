import { SetStateAction, Dispatch } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export interface SimpleDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { setOpen, open } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
    </Dialog>
  );
}
