import { styled } from '@mui/material/styles';

const BlankLayoutRoot = styled('div')(
    ({ theme }) => ({
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%'
    })
);

const BlankLayoutWrapper = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const BlankLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const BlankLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const BlankLayout = (props) => {
  return (
    <BlankLayoutRoot>
      <BlankLayoutWrapper>
        <BlankLayoutContainer>
          <BlankLayoutContent>
            {props.children}
          </BlankLayoutContent>
        </BlankLayoutContainer>
      </BlankLayoutWrapper>
    </BlankLayoutRoot>
  );
};

export default BlankLayout;