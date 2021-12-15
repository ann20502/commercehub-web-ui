import { useState } from 'react';
import { styled } from '@mui/material/styles';
import DashboardNavbar from './DashboardNavbar';

const MainLayoutRoot = styled('div')(
    ({ theme }) => ({
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%'
    })
);

const MainLayoutWrapper = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const MainLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const MainLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const MainLayout = (props) => {
  // eslint-disable-next-line
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <MainLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <MainLayoutWrapper>
        <MainLayoutContainer>
          <MainLayoutContent>
            {props.children}
          </MainLayoutContent>
        </MainLayoutContainer>
      </MainLayoutWrapper>
    </MainLayoutRoot>
  );
};

export default MainLayout;