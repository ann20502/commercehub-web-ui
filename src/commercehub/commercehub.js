import './commercehub.css';
import { Route, Switch } from 'react-router';
import ProtectedRoute from './auth/protected-route';
import Linking from './content/linking';
import SalesOverview from './content/sales-overview';
import LoginRedirect from './auth/login-redirect';
import Home from './content/home';

const CommerceHub = () => {
    return <Switch>
        <ProtectedRoute path="/linking" component={Linking}/>
        <ProtectedRoute path="/sales" component={SalesOverview}/>
        <Route path="/login/redirect" component={LoginRedirect}/>
        <Route path="/" exact component={Home}/>
    </Switch>;
};

export default CommerceHub;