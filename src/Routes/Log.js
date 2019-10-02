import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Loader from '../Components/Loader';
import { getLang } from '../Util/Languages';
import UserLog from '../Components/UserLog';
import DateLog from '../Components/DateLog';
import { ME } from '../Router';

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

    const { data, loading } = useQuery( SEE_USER, { variables: { username } } );
    const { data: meData, loading: meLoading } = useQuery(ME);

    const lang = getLang( meData && meData.me && !meLoading && meData.me.lang );
    const date = new Date();
    // const yyyymmdd = getYyyymmdd(date.getFullYear(), date.getMonth(), date.getDate());
    const yyyymmdd = "2019-09-23"

    
    return <>
        <Container>
            { loading && <Loader /> }
            { !loading && data && data.seeUser && !meLoading && meData && meData.me &&
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
                    me={meData.me}
                    yyyymmdd={yyyymmdd}
                />
            </>
            }
        </Container>
    </>
}