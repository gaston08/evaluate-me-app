import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';

export default function Main() {
  return (
    <Grid
      item
      xs={12}
      md={8}
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
