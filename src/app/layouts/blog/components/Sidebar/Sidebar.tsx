import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { subjects } from 'app/shared/data/exam';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Sidebar() {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography>
          <b>ubaparciales</b> es un proyecto <b>sin fines de lucro</b> que se
          mantiene a través de donaciones.
        </Typography>
        <Typography>
          Desarrollar y mantener este sitio web lleva tiempo y dinero. Por lo
          que <b>necesitamos de tu ayuda</b> para impulsar este proyecto.
        </Typography>
        <Typography>
          Si encontras útil esta plataforma o querés apoyar la causa,{' '}
          <b>invitanos un cafecito</b>.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <CafecitoButton />
        </Box>
      </Paper>
      <>
        {matches ? null : (
          <Box sx={{ pb: 3, pt: 3 }}>
            <Link variant="h6" component={RouterLink} to="/tests">
              Parciales.
            </Link>
            <Box sx={{ ml: 2 }}>
              {subjects.map((subject) => (
                <Link
                  component={RouterLink}
                  display="block"
                  variant="body1"
                  to={`/tests/${subject.value}`}
                  key={subject.value}
                >
                  {subject.label}
                </Link>
              ))}
            </Box>
          </Box>
        )}
      </>
    </Grid>
  );
}

function CafecitoButton() {
  return (
    <a href="https://cafecito.app/ubaparciales" rel="noopener" target="_blank">
      <img
        srcSet="https://cdn.cafecito.app/imgs/buttons/button_1.png 1x, https://cdn.cafecito.app/imgs/buttons/button_1_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_1_3.75x.png 3.75x"
        src="https://cdn.cafecito.app/imgs/buttons/button_1.png"
        alt="Invitame un café en cafecito.app"
      />
    </a>
  );
}
