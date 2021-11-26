import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import CommerceHub from './commercehub/commercehub';
import Auth0ProviderWithEnv from './commercehub/auth/auth0-provider-with-env';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithEnv>
      <CommerceHub />
    </Auth0ProviderWithEnv>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
