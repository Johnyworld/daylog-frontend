import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import TodayPresenter from '../Components/TodayPresenter';
import { gql } from 'apollo-boost';

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
            pins {
                doing {
                    id
                    name
                    color
                    icon
                }
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

export default () => {
    const { data, loading } = useQuery( TODAY_QUERY );
    const { data: meData, loading: meLoading } = useQuery(ME);
    const [ focused, setFocused ] = useState( 95 );
    
    if ( !loading && data && data.seeTodayPosts && meData && meData.me && !meLoading ) {
        return (
            <TodayPresenter
                data={data}
                meData={meData}
                focused={focused}
                setFocused={setFocused}
            />
        )
    } else return <Loader />
};