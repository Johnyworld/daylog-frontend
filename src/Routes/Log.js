import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Loader from '../Components/Loader';
import { getLang } from '../Util/Languages';
import UserLog from '../Components/UserLog';
import DateLog from '../Components/DateLog';

export const SEE_USER = gql`
    query seeUser( $username: String! ) {
        seeUser( username: $username ) {
            id
            username
            fullname
            avatar
            bio
            likesTotal
            followersCount
            followingCount
            isFollowing
            isSelf
        }
    }
`;

const Container = styled.main`
    ${({ theme })=> theme.mainContainer };
    background-color: ${({ theme })=> theme.c_lightGray };
`;

export default () => {
    const username = window.location.hash.split("/")[2];
    const lang = getLang();
    const { data, loading } = useQuery( SEE_USER, { variables: { username } } );
    
    return <>
        <Container>
            { loading && <Loader /> }
            { !loading && data && data.seeUser && 
            <>
                <UserLog
                    id={data.seeUser.id} 
                    avatar={data.seeUser.avatar}
                    username={username}
                    fullname={data.seeUser.fullname}
                    likesTotal={data.seeUser.likesTotal}
                    bio={data.seeUser.bio}
                    lang={lang}
                    followersCount={data.seeUser.followersCount}
                    followingCount={data.seeUser.followingCount}
                    isFollowing={data.seeUser.isFollowing}
                    isSelf={data.seeUser.isSelf}
                />
                <DateLog
                    username={username}
                    lang={lang}
                />
            </>
            }
        </Container>
    </>
}