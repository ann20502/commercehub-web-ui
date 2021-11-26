import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@mui/material';
import {
  BarChart as BarChartIcon,
  Link as LinkIcon,
  Activity as ActivityIcon
} from 'react-feather';
import NavItem from './NavItem';
import { useAuth0 } from '@auth0/auth0-react';

// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith'
// };

const items = [
  {
    href: '/sales',
    icon: BarChartIcon,
    title: 'Sales Overview'
  },
  {
    href: '/linking',
    icon: LinkIcon,
    title: 'Linking'
  },
  {
    href: '/task',
    icon: ActivityIcon,
    title: 'Task Overview'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {

  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const { user } = useAuth0();

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          // component={RouterLink}
          src={user.picture}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          // to="/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.email}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Like it ?
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Stars & Follows Us
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            href="/github"
            variant="contained"
          >
            Github
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default DashboardSidebar;