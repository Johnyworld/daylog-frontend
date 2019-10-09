import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Loader from '../Components/Loader';
import { getLang } from '../Util/Languages';
import UserLog from '../Components/UserLog';
import DateLog from '../Components/DateLog';
import { ME } from '../Components/TodayQueries';
import { getYyyymmdd } from '../Util/Convertors';

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

    const date = new Date();

    const [ yearSum, setYearSum ] = useState( date.getFullYear() );
    const [ monthSum, setMonthSum ] = useState( date.getMonth() );
    const [ dateSum, setDateSum ] = useState( date.getDate() );
    
    window.scrollTo(0, 0); 

    if ( !loading && data && data.seeUser && !meLoading && meData && meData.me ) {

        date.setYear( yearSum );
        date.setMonth( monthSum );
        date.setDate( dateSum );
        
        const yyyymmdd = getYyyymmdd(date.getFullYear(), date.getMonth(), date.getDate());
        
        const lang = getLang( meData.me.lang );

        const setTheDate = {
            setPrevYear : () => setYearSum( yearSum-1 ),
            setNextYear : () => setYearSum( yearSum+1 ),
            setPrevMonth : () => setMonthSum( monthSum-1 ),
            setNextMonth : () => setMonthSum( monthSum+1 ),
            setPrevWeek : () => setDateSum( dateSum-7 ),
            setNextWeek : () => setDateSum( dateSum+7 ),
            setPrevDay : () => setDateSum( dateSum-1 ),
            setNextDay : () => setDateSum( dateSum+1 ),
        }
        
        return <>
            <Container>
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
                        meName={meData.me.username}
                    />
                    <DateLog
                        username={username}
                        lang={lang}
                        yyyymmdd={yyyymmdd}
                        setTheDate={setTheDate}
                    />
                </>
            </Container>
        </> 
    } else return <Loader />;
}