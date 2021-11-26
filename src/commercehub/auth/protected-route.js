import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoggingIn from "./logging-in";
import withRoleRequired from "./with-role-required";

const ProtectedRoute = ({ component, ...args }) => {

  const ROLE_ADMIN = process.env.REACT_APP_AUTH_ROLE_ADMIN;

  return <Route
    component={
      withAuthenticationRequired(
        () => withRoleRequired(component, ROLE_ADMIN),
        {
          onRedirecting: () => <LoggingIn />,
        }
      )
    }
    {...args}
  />
};

export default ProtectedRoute;