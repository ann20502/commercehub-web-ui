import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoggingIn from "./logging-in";
import withRoleRequired from "./with-role-required";

const ProtectedRoute = ({ component, ...args }) => {

  const ROLE_TO_CHECK = process.env.REACT_APP_AUTH_ROLE_TO_CHECK;

  return <Route
    component={
      withAuthenticationRequired(
        () => withRoleRequired(component, ROLE_TO_CHECK),
        {
          onRedirecting: () => <LoggingIn />,
        }
      )
    }
    {...args}
  />
};

export default ProtectedRoute;