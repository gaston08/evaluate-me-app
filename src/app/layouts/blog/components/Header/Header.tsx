import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import MenuButton from './components/MenuButton';
import { subjects } from 'app/shared/data/exam';
import { contextAuth } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const subjectsArr = subjects.map((subject) => {
  return {
    label: subject.label,
    value: '/tests/' + subject.value,
  };
});

export default function Header() {
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
        <Box align="center" noWrap sx={{ flex: 1, pt: 1 }}>
          <Link
            sx={{ textDecoration: 'none' }}
            component={RouterLink}
            to="/tests"
          >
            <img
              style={{ width: 100, height: 'auto' }}
              src={'/assets/logo.svg'}
            />
          </Link>
        </Box>
        <IconButton>{/**<SearchIcon />**/}</IconButton>
        <Box>
          {auth.isLoggedIn ? (
            <MenuButton
              text="Mi perfil"
              icon={faUser}
              menuItems={[
                { label: 'Mi perfil', value: '/profile/me' },
                { label: 'Mis exámenes', value: '/profile/exams' },
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
