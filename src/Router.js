import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './Routes/Auth';
import Today from './Routes/Today';
import Feed from './Routes/Feed';
import Log from './Routes/Log';
import Post from './Routes/Post';
import Search from './Routes/Search';
import Header from './Components/Header';
import { gql } from 'apollo-boost';
import EditProfile from './Routes/EditProfile';

export const ME = gql`
    {
        me {
            id
            username
            avatar
            fullname
            email
            bio
            lang
            followersCount
            followingCount
            likesTotal
            doings {
                id
                name
                color
                icon
            }
        }
    }
`;

export const TODAY_QUERY = gql`
    {
       seeTodayPosts {
            id
            doing {
                id
                name
                icon
                color
            }
            location
            likesCount
            commentsCount
            isLiked
            blocks
            score
            startAt
            endAt
            yyyymmdd
        }
    } 
`;

const LoggedInRoutes = () => {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path='/' component={Today} />
                <Route path='/feed/:username' component={Log} />
                <Route path='/feed' component={Feed} />
                <Route path='/log/:username/edit' component={EditProfile} />
                <Route path='/log/:username' component={Log} />
                <Route path='/post/:postId'component={Post} />
                <Route path='/search'component={Search} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    )
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