import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoggingIn from "./logging-in";

const ProtectedRoute = ({ component, ...args }) => (
    <Route
        component={
            withAuthenticationRequired(
                component,
                {
                    onRedirecting: () => <LoggingIn/>,
                }
            )
        }
        {...args}
    />
);

export default ProtectedRoute;