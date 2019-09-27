import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../Routes/Auth';
import Today from '../Routes/Today';
import Feed from '../Routes/Feed';
import Log from '../Routes/Log';
import Post from '../Routes/Post';
import Header from './Header';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Loader from './Loader';

const ME = gql`
    {
        me {
            username
            avatar
            fullname
            email
            bio
            followersCount
            followingCount
            likesTotal
        }
    }
`;

const LoggedInRoutes = () => {
    const { data, loading } = useQuery(ME);

    if ( !loading && data && data.me ) {
        sessionStorage.setItem('me', JSON.stringify(data.me));
    }

    return ( !loading && data && data.me ?
        <>
            <Header loggedUser={data.me} />
            <Switch>
                <Route exact path='/' component={Today} />
                <Route path='/feed' component={Feed} />
                <Route path='/log/:username' component={Log} />
                <Route path='/post/:postId'component={Post} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    : <Loader /> )
}

const LoggedOutRoutes = () => (
    <>
        <Route exact path='/' component={Auth} />
        <Redirect to="/" />
    </>
)
const AppRouter = ({ isLoggedIn }) => (
    isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />
)

AppRouter.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired
}
export default AppRouter;