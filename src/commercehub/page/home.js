import { Button, Container, createTheme, ThemeProvider, Typography } from "@mui/material";
import { Box, styled } from "@mui/system"
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f6f8',
      paper: '#ffffff'
    },
    primary: {
      contrastText: '#ffffff',
      main: '#5664d2'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    },
  },
  typography: {
      fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
      ].join(','),
  }
});

theme.typography.title = {
  fontFamily: '"Apple Color Emoji"',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  [theme.breakpoints.up('xs')]: {
      fontSize: '2.5rem',
      letterSpacing: '.5rem',
  },
  [theme.breakpoints.up('sm')]: {
      fontSize: '3.5rem',
      letterSpacing: '.8rem',
  },
  [theme.breakpoints.up('md')]: {
      fontSize: '4.5rem',
      letterSpacing: '1rem',
  }
};

theme.typography.subtitle = {
  fontStyle: 'italic',
  margin: '.5rem 0 1rem 0',
  [theme.breakpoints.up('xs')]: {
      fontSize: '1.2rem'
  },
  [theme.breakpoints.up('sm')]: {
      fontSize: '2rem'
  },
  [theme.breakpoints.up('md')]: {
      fontSize: '2.5rem',
      margin: '.5rem 0 2rem 0',
  },
  fontSize: '2.2rem',
}

const BtnLogin = styled(Button)(({theme}) => ({
  fontWeight: 'bold',
  [theme.breakpoints.up('xs')]: {
      fontSize: '1rem'
  },
  [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem'
  }
}));

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            variant="title"
            component="div"
          >
              Commerce Hub
          </Typography>
          <Typography
            align="center"
            // color="textPrimary"
            variant="subtitle"
            component="div"
          >
              A quick way to browse sales of<br/>multiple platforms & shops
          </Typography>
          <div
            align="center">
            <BtnLogin color="primary" variant="contained" component={Link} to="/sales">Login Now</BtnLogin>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Home;