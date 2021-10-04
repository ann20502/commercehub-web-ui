import * as React from 'react';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const colors = ['#fff', '#f6efe8'];
const position = Math.floor(Math.random() * colors.length);
const backgroundColors = colors[position];

const MyStack = styled(Stack)({
    height: '100%',
    backgroundColor: backgroundColors,
});

const LoggingIn = () => {

    return <MyStack
        direction="row"
        justifyContent="center"
        alignItems="center">

        <CircularProgress/>

    </MyStack>;
};

export default LoggingIn;