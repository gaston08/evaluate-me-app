import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

interface SidebarProps {
  archives: ReadonlyArray<{
    url: string;
    title: string;
  }>;
  description: string;
  title: string;
}

export default function Sidebar(props: SidebarProps) {
  const { archives, description, title } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography>{description}</Typography>
      </Paper>
      <Box sx={{ pb: 3, pt: 3 }}>
        <Link variant="h6" component={RouterLink} to="/tests">
          {title}
        </Link>
        <Box sx={{ ml: 2 }}>
          {archives.map((archive) => (
            <Link
              component={RouterLink}
              display="block"
              variant="body1"
              to={archive.url}
              key={archive.title}
            >
              {archive.title}
            </Link>
          ))}
        </Box>
      </Box>
    </Grid>
  );
}
