import { Fragment, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
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
      <Accordion sx={{ background: 'white', mt: 2 }}>
        <AccordionSummary expandIcon={<ArrowDownIcon />}>
          <Link>¿Cómo funciona?</Link>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography>
              Copia este link y compartilo en tu grupo de whatsapp.
            </Typography>
          </Box>
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
        </AccordionDetails>
      </Accordion>
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

function ArrowDownIcon() {
  return (
    <svg style={{ width: 20, height: 20 }} viewBox="0 0 384 512">
      <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
    </svg>
  );
}
