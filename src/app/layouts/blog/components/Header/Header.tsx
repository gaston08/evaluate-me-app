import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuButton from './components/MenuButton';
import { subjects } from 'app/shared/exams/ubaxxi';
import { contextAuth } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const subjectsArr = subjects.map((subject) => {
  return {
    label: subject.label,
    value: '/tests/' + subject.value,
  };
});

export default function Header() {
  const { auth, setAuth } = React.useContext<contextAuth>(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

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
          <MenuButton
            text="Parciales"
            icon={<MenuIcon />}
            menuItems={subjectsArr}
          />
        </Box>
        <Box align="center" sx={{ flex: 1, pt: 1 }}>
          <Link
            sx={{ textDecoration: 'none' }}
            component={RouterLink}
            to="/tests"
          >
            <img
              style={{ width: matches ? 75 : 100, height: 'auto' }}
              src={'/assets/logo.svg'}
            />
          </Link>
        </Box>
        <Box>
          {auth.isLoggedIn ? (
            <MenuButton
              text="Mi perfil"
              icon={<UserIcon />}
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

function UserIcon() {
  return (
    <svg
      style={{ width: 20, height: 20 }}
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="user"
      className="svg-inline--fa fa-user "
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
      ></path>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      style={{ width: 20, height: 20 }}
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="bars"
      className="svg-inline--fa fa-bars "
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
      ></path>
    </svg>
  );
}
