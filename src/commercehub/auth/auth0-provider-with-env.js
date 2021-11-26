import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useHistory } from "react-router";

const Auth0ProviderWithEnv = ({children}) => {

    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = window.location.origin + "/login/redirect";
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.push( appState?.returnTo || window.location.pathname );
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={redirectUri}
            audience={audience}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithEnv;