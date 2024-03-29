import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import MenuButton from './components/MenuButton';

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box>
          <MenuButton
            text="Parciales"
            menuItems={[
              { label: 'IPC', link: 'pensamiento-cientifico' },
              { label: 'ICSE', link: 'sociedad-y-estado' },
            ]}
          />
        </Box>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>{/**<SearchIcon />**/}</IconButton>
        <Box>
          <MenuButton
            text="Mi perfil"
            icon={faUser}
            menuItems={[{ label: 'Mi perfil', link: 'https://' }]}
          />
        </Box>
      </Toolbar>
    </React.Fragment>
  );
}
