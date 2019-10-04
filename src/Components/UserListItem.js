import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Button from './Button';
import Words from '../Lang/Words.json'
import Username from './Username';
import TextSmall from './TextSmall';
import { FOLLOW, UNFOLLOW } from './UserLog';
import { useMutation } from 'react-apollo-hooks';
import { FEED_QUERY } from '../Routes/Feed';
import { SEE_FOLLOWERS } from './Followers';
import { SEE_FOLLOWING } from './Following';
import { ME } from '../Router';

const Container = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme })=> theme.c_lightGray };
    }
    button {
        width: 100px;
        padding: 5px 0;
    }
`;

const User = styled.div`
    display: flex;
    align-items: center;
    .avatar {
        margin-right: 10px;
    }
`;

const UserListItem = ({ id, username, fullname, avatar, isFollowing, thisUser, lang }) => {
    const [ isFollowingState, setIsFollowingState ] = useState(isFollowing);
    
    const [ followMutation ] = useMutation( FOLLOW, { 
        variables : { id },
        refetchQueries: [
            { query: SEE_FOLLOWERS, variables: { username: thisUser }},
            { query: SEE_FOLLOWING, variables: { username: thisUser }},
            { query: ME },
            { query: FEED_QUERY }
        ]
    });

    const [ unFollowMutation ] = useMutation( UNFOLLOW, { 
        variables : { id },
        refetchQueries: [
            { query: SEE_FOLLOWERS, variables: { username: thisUser }},
            { query: SEE_FOLLOWING, variables: { username: thisUser }},
            { query: ME },
            { query: FEED_QUERY }
        ]
    });

    const follow = () => {
        setIsFollowingState(true);
        followMutation();
    }

    const unFollow = () => {
        setIsFollowingState(false);
        unFollowMutation();
    }

    return (
        <Container>
            <User>
                <Avatar avatar={avatar} size="small" />
                <div>
                    <Username username={username} />
                    <TextSmall string={fullname} />
                </div>
            </User>
            { isFollowingState
                ? <Button lang={lang} text={Words.unFollow} onClick={unFollow} />
                : <Button lang={lang} text={Words.follow} onClick={follow} />
            }
        </Container>
    )
}

UserListItem.propTypes = {
    username : PropTypes.string.isRequired,
    fullname : PropTypes.string.isRequired,
    avatar : PropTypes.string.isRequired,
    isFollowing : PropTypes.bool.isRequired,
    lang: PropTypes.string
}

export default UserListItem