import { ThemeProvider } from '@emotion/react';
import { Button, createTheme, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const theme = createTheme({
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

const MyGrid = styled(Grid)({
    backgroundColor: '#f6efe8',
    height: '100%',
    textAlign: 'center',
});

const MyBtn = styled(Button)(({theme}) => ({
    fontWeight: 'bold',
    [theme.breakpoints.up('xs')]: {
        fontSize: '1rem'
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.5rem'
    }
}));

const Home = () => {

    const content =
    <ThemeProvider theme={theme}>
        <MyGrid
            container
            direction="column"
            justifyContent="center"
            alignItems="center">

            <Typography variant="title" component="div">commerce hub</Typography>
            <Typography variant="subtitle" component="div">A quick way to browse sales of<br/>multiple platforms & shops</Typography>
            <MyBtn color="secondary" variant="contained" component={Link} to="/linking">Login Now</MyBtn>

        </MyGrid>
    </ThemeProvider>;

    return content;
};

export default Home;