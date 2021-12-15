import { StyledEngineProvider } from '@mui/styled-engine';
import { ThemeProvider } from '@mui/material';
import theme from './theme/index';
import GlobalStyles from './global-styles';
import { Route, Switch } from 'react-router';
import ProtectedRoute from './auth/protected-route';
import Linking from './page/linking';
import LinkingAdd from './page/linking-add';
import SalesOverview from './page/sales-overview';
import LoginRedirect from './auth/login-redirect';
import Home from './page/home';
import DashboardLayout from './layout/DashboardLayout';
import BlankLayout from './layout/BlankLayout';
import NotFound from './page/not-found';
import LinkingEdit from './page/linking-edit';
import NoAccess from './page/no-access';
import TaskOverview from './page/task-overview';
import MainLayout from './layout/MainLayout';

const CommerceHub = () => {
    return <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <Switch>
                <ProtectedRoute
                    exact
                    path="/sales"
                    component={<DashboardLayout><SalesOverview/></DashboardLayout>}
                    />
                <ProtectedRoute
                    exact
                    path="/linking"
                    component={<DashboardLayout><Linking/></DashboardLayout>}
                    />
                <ProtectedRoute
                    exact
                    path="/linking/add"
                    component={<DashboardLayout><LinkingAdd/></DashboardLayout>}
                    />
                <ProtectedRoute
                    exact
                    path="/linking/edit"
                    component={<DashboardLayout><LinkingEdit/></DashboardLayout>}
                    />
                <ProtectedRoute
                    exact
                    path="/task"
                    component={<DashboardLayout><TaskOverview/></DashboardLayout>}
                    />
                <Route exact path="/">
                    <BlankLayout><Home/></BlankLayout>
                </Route>
                <Route exact path="/login/redirect">
                    <LoginRedirect/>
                </Route>
                <Route exact path="/not-authorized">
                    <MainLayout><NoAccess/></MainLayout>
                </Route>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>
        </ThemeProvider>
    </StyledEngineProvider>;
};

export default CommerceHub;