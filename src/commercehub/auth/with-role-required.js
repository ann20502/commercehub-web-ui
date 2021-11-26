import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const WithRoleRequired = (component, roleToCheck) => {

  const history = useHistory();
  const { getIdTokenClaims } = useAuth0();
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const roleClaimType = process.env.REACT_APP_AUTH_ROLE_CLAIM_TYPE;

  useEffect(() => {

    async function getRoles() {
      const claims = await getIdTokenClaims();
      return claims[roleClaimType] || [];
    }

    async function checkRoles(role) {
      const roles = await getRoles();
      const hasRole = roles.includes(role);
      if (!hasRole) {
        history.push('/not-authorized');
      } else {
        setIsAuthorized(true);
      }
    }

    checkRoles(roleToCheck);

  }, [getIdTokenClaims, history, roleToCheck, roleClaimType]);

  return isAuthorized ? component : <div>Checking permission ...</div>; // TODO: Create a permission check page
};

export default WithRoleRequired;