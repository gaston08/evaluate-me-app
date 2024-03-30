import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import MenuButton from './components/MenuButton';
import { subjects } from 'app/shared/data/exam';
import { contextAuth } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';

interface HeaderProps {
  title: string;
}

const subjectsArr = subjects.map((subject) => {
  return {
    label: subject.label,
    value: '/tests/' + subject.value,
  };
});

export default function Header(props: HeaderProps) {
  const { title } = props;
  const { auth, setAuth } = React.useContext<contextAuth>(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setAuth({
      user: null,
      isLoggedIn: false,
      isLoading: false,
    });
    navigate('/auth/login');
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box>
          <MenuButton text="Parciales" menuItems={subjectsArr} />
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
          {auth.isLoggedIn ? (
            <MenuButton
              text="Mi perfil"
              icon={faUser}
              menuItems={[
                { label: 'Mi perfil', value: '/profile/me' },
                {
                  label: 'Cerrar sesión',
                  onClick: logout,
                },
              ]}
            />
          ) : (
            <Button onClick={handleLogin} variant="outlined">
              LOGIN
            </Button>
          )}
        </Box>
      </Toolbar>
    </React.Fragment>
  );
}
