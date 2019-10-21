import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import TextRegular from './TextRegular';
import Icon from './Icon';
import TextSmall from './TextSmall';
import Button from './Button';
import Words from '../Lang/Words.json';
import Theme from '../Styles/Theme';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { SEE_USER } from '../Routes/Log';
import { FEED_POST } from '../Routes/Feed';
import Following from './Following';
import Followers from './Followers';
import { getLangArray } from '../Util/Languages';

export const FOLLOW = gql`
    mutation follow( $id: String! ) {
        follow( id: $id )
    }
`;

export const UNFOLLOW = gql`
    mutation unFollow( $id: String! ) {
        unFollow( id: $id )
    }
`; 

const Container = styled.section`
    background-color: white;
    ${({ theme })=> theme.box };
    @media screen and (min-width: 768px) {
        padding-top: 50px;
    }
`;

const Wrapper = styled.div`
    ${({ theme })=> theme.wrapper };
    padding: 40px 30px;
    display: flex;
    position: relative;
    > button, > a {
        position: absolute;
        bottom: -14px;
        right: 30px;
    }
`;

const AvatarStyled = styled(Avatar)`
    margin-right: 20px;
`;

const Username = styled(TextRegular)`
    @media screen and (min-width: 768px) {
        font-size: 20px;
    }
`

const Info = styled.div`
    width: 100%;
    > * { margin-top: 10px; }
`;

const User = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Likes = styled.div`
    display: flex;
    align-items: center;
    svg { margin-right: 10px; }
`;

const Follow = styled.div`
    > button {
        display: inline-block;
        margin-right: 30px;
        > *:first-child {
            margin-right: 10px;
        }
    }
`;

const UserLog = ({
    id,
    avatar,
    username,
    fullname,
    likesTotal,
    bio,
    lang,
    followersCount,
    followingCount,
    isFollowing,
    isSelf,
    meName
}) => {
    const [ onPopup, setOnPopup ] = useState(false);
    const [ isFollowingState, setIsFollowingState ] = useState(isFollowing);
    const [ followersCountState, setFollowersCountState ] = useState(followersCount);

    const [ followMutation ] = useMutation( FOLLOW, { 
        variables : { id },
        refetchQueries: [
            { query: SEE_USER, variables: { username }},
            { query: FEED_POST }, 
        ]
    });
    const [ unFollowMutation ] = useMutation( UNFOLLOW, { 
        variables : { id },
        refetchQueries: [
            { query: SEE_USER, variables: { username }},
            { query: FEED_POST }, 
        ]
    });

    const onClickFollow = () => {
        if ( !isFollowingState ) {
            setIsFollowingState(true);
            setFollowersCountState( followersCountState + 1 );
            followMutation();
        } else {
            setIsFollowingState(false);
            setFollowersCountState( followersCountState - 1 );
            unFollowMutation();
        }
    }

    const showFollowersList = () => {
        setOnPopup("followersList");
    }    

    const showFollowingList = () => {
        setOnPopup("followingList");
    }

    const closePopup = () => {
        setOnPopup(false);
    }

    return (
        <Container>
            <Wrapper>
                <AvatarStyled avatar={avatar} size="large" />
                <Info>
                    <User>
                        <Username string={username} weight="bold" />
                        <Likes>
                            <Icon icon="clap" size="small" />
                            <TextRegular string={likesTotal} />
                        </Likes>
                    </User>
                    <Follow>
                        <button onClick={showFollowersList} >
                            <TextSmall text={Words.followers} color={Theme.c_black} />
                            <TextSmall string={followersCountState} color={Theme.c_black} weight="bold" />
                        </button>
                        <button onClick={showFollowingList} >
                            <TextSmall text={Words.following} color={Theme.c_black} />
                            <TextSmall string={followingCount} color={Theme.c_black} weight="bold" />
                        </button>
                    </Follow>
                    <div>
                        <p><TextSmall string={fullname} color={Theme.c_blueDarker1} /></p>
                        <TextSmall string={bio} lang={lang} />
                    </div>
                </Info>
                { !isSelf
                    ? !isFollowingState
                        ? <Button onClick={onClickFollow} text={Words.follow} lang={lang} />
                        : <Button onClick={onClickFollow} text={Words.unFollow} lang={lang} />
                    : <Button to={`/log/${username}/edit`} text={Words.editProfile} lang={lang} /> 
                }
                { onPopup === "followingList" && <Following username={username} closePopup={closePopup} lang={lang} meName={meName} /> }
                { onPopup === "followersList" && <Followers username={username} closePopup={closePopup} lang={lang} meName={meName} /> }
            </Wrapper>
        </Container>
    )
}

UserLog.propTypes = {
    id: PropTypes.string,
    avatar: PropTypes.string,
    username: PropTypes.string,
    fullname: PropTypes.string,
    likesTotal: PropTypes.number,
    bio: PropTypes.string,
    lang: PropTypes.oneOf( getLangArray() ),
    followersCount: PropTypes.number,
    followingCount: PropTypes.number,
    isFollowing: PropTypes.bool,
    isSelf: PropTypes.bool,
    meName: PropTypes.string
}

export default UserLog;