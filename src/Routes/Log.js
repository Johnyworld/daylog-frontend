import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Loader from '../Components/Loader';
import Words from '../Lang/Words.json';
import Theme from '../Styles/Theme';
import { getLang, getPrintDate } from '../Util/Languages';
import TextLarge from '../Components/TextLarge';
import SmallButton from '../Components/SmallButton';
import UserLog from '../Components/UserLog';

export const SEE_USER = gql`
    query seeUser( $username: String! ) {
        seeUser( username: $username ) {
            id
            username
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
    background-color: ${({ theme })=> theme.c_lightGray };
    min-height: calc(100vh - 64px);
`;

const LogContainer = styled.section`
    padding: 40px 30px;
    h2 {
        margin: 30px 0;
    }
`;

const DateTab = styled.div`
    button {
        margin-right: 20px;
    }
`;

export default () => {
    const username = window.location.hash.split("/")[2];
    const lang = getLang();
    const { data, loading } = useQuery( SEE_USER, { variables: { username } } );

    const [ theDay, setTheDay ] = useState(new Date());
    const [ logState, setLogState ] = useState("day");

    const clickDateTab = (e) => {
        setLogState( e.currentTarget.dataset.data );
    }
    
    if ( !loading && data && data.seeUser ) {
        return <>
            { !loading && data && data.seeUser && 
                <Container>
                    <UserLog
                        id={data.seeUser.id} 
                        avatar={data.seeUser.avatar}
                        username={username}
                        likesTotal={data.seeUser.likesTotal}
                        bio={data.seeUser.bio}
                        lang={lang}
                        followersCount={data.seeUser.followersCount}
                        followingCount={data.seeUser.followingCount}
                        isFollowing={data.seeUser.isFollowing}
                        isSelf={data.seeUser.isSelf}
                    />
                    <LogContainer>
                        <DateTab>
                            <SmallButton onClick={clickDateTab} text={Words.day} data="day" lang={"en"} color={ logState === "day" ? Theme.c_blue : undefined } />
                            <SmallButton onClick={clickDateTab} text={Words.week} data="week" lang={"en"} color={ logState === "week" ? Theme.c_blue : undefined } />
                            <SmallButton onClick={clickDateTab} text={Words.month} data="month" lang={"en"} color={ logState === "month" ? Theme.c_blue : undefined } />
                            <SmallButton onClick={clickDateTab} text={Words.year} data="year" lang={"en"} color={ logState === "year" ? Theme.c_blue : undefined } />
                        </DateTab>
                        <TextLarge string={getPrintDate( theDay, lang, "withoutDow" )} color={Theme.c_blueDarker1} />
                        { logState === "day" && <></> }
                        { logState === "week" && <></> }
                        { logState === "month" && <></> }
                        { logState === "year" && <></> }
                    </LogContainer>
                </Container>
            }
        </>
    } else return <Loader />
}