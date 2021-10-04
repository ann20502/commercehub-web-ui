import { useAuth0 } from "@auth0/auth0-react";
import { ThemeProvider } from "@emotion/react";
import { Avatar, createTheme, IconButton, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

const MyStack = styled(Stack)({
    backgroundColor: '#f6efe8',
    padding: '1rem 5% 1.2rem 5%',
});

const theme = createTheme();

theme.typography.header = {
    fontWeight: 'bold',
    flexGrow: '2',
    textTransform: 'capitalize',
    [theme.breakpoints.up('xs')]: {
        fontSize: '2rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '3rem',
    }
}

const Name = styled('span')({
    fontSize: '1rem',
});

const TemplateHeader = (props) => {

    const { user, logout } = useAuth0();

    const content =
    <ThemeProvider theme={theme}>
        <MyStack
            direction="row"
            alignItems="center">

            <Typography variant="header" color="secondary"># {props.name}</Typography>
            <Name>{user.name}</Name>
            <IconButton onClick={() => logout({ returnTo: window.location.origin })}>
                <Avatar src={user.picture}/>
            </IconButton>

        </MyStack>
    </ThemeProvider>;

    return content;
};

export default TemplateHeader;