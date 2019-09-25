import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../Routes/Auth';
import Today from '../Routes/Today';
import Feed from '../Routes/Feed';
import Log from '../Routes/Log';

const LoggedInRoutes = () => (
    <>
        <Route exact path='/' component={Today} />
        <Route path='/feed' component={Feed} />
        <Route path='/log' component={Log} />
    </>
)

const LoggedOutRoutes = () => (
    <>
        <Route exact path='/' component={Auth} />
    </>
)
const AppRouter = ({ isLoggedIn }) => (
    <Router>
        <Switch>
            { isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes /> }
        </Switch>
    </Router>
)

AppRouter.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired
}
export default AppRouter;