import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InputIcon from '@mui/icons-material/Input';
import Logo from './Logo';
import { useAuth0 } from '@auth0/auth0-react';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {

  const { logout } = useAuth0();

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden xlDown>
          <IconButton color="inherit" size="large" onClick={() => logout({ returnTo: window.location.origin })}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" size="large" onClick={() => logout({ returnTo: window.location.origin })}>
            <InputIcon />
          </IconButton>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;