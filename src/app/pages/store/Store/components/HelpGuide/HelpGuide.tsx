import { Fragment, useState } from 'react';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface HelpGuideProps {
  invitation_code: number;
}

export default function HelpGuide(props: HelpGuideProps) {
  const { invitation_code } = props;
  const [copied, setCopied] = useState<boolean>(false);

  const handleClick = () => {
    navigator.clipboard
      .writeText(`ubaparciales.com?code=${invitation_code}`)
      .then(() => {
        setCopied(true);
      })
      .catch(console.error);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setCopied(false);
  };

  return (
    <Fragment>
      <Box sx={{ background: 'white', p: 2 }}>
        <Typography variant="body1">¿Cómo funciona?</Typography>
        <Typography sx={{ color: 'text.secondary' }} variant="body2">
          Copia este link y compartilo en tu grupo de whatsapp de uba xxi.
        </Typography>
        <Typography sx={{ color: 'text.secondary' }} variant="body2">
          Cuantas más personas se unan utilizando tu link, más cafecitos vas a
          recibir.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Input
            disabled
            defaultValue={`ubaparciales.com?code=${invitation_code}`}
          />
          <Button
            size="small"
            sx={{ ml: 1 }}
            variant="contained"
            color={copied ? 'success' : 'primary'}
            onClick={handleClick}
          >
            Copiar!
          </Button>
        </Box>
      </Box>
      <Snackbar open={copied} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Link copiado en el portapapeles!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
