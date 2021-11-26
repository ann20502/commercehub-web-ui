import * as React from 'react';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const colors = ['#fff', '#f4f6f8'];
const position = Math.floor(Math.random() * colors.length);
const backgroundColors = colors[position];

const LoggingIn = (props) => {

    const bgColor = props.backgroundColor ? props.backgroundColor : backgroundColors;

    const MyStack = styled(Stack)({
        height: '100%',
        backgroundColor: bgColor
    });

    return <MyStack
        direction="row"
        justifyContent="center"
        alignItems="center">

        <CircularProgress color="primary"/>

    </MyStack>;
};

export default LoggingIn;