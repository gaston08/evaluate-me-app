import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';

interface MainProps {
  xs: number;
  md: number;
}

export default function Main(props: MainProps) {
  const { xs, md } = props;
  return (
    <Grid
      item
      xs={xs}
      md={md}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Outlet />
    </Grid>
  );
}
