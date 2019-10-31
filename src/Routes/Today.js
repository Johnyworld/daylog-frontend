import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import TodayPresenter from '../Components/TodayPresenter';
import { gql } from 'apollo-boost';
import { getToday } from '../Util/Convertors';

export const ME = gql`
    {
        me {
            id
            username
            avatar
            fullname
            email
            bio
            isPrivate
            lang
            followersCount
            followingCount
            likesTotal
            pins {
                id
                isFavorite
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
query seeTodayPosts( $yyyymmdd: String! ) { 
   seeTodayPosts( yyyymmdd: $yyyymmdd ) {
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
    const yyyymmdd = getToday();
    const { data, loading } = useQuery( TODAY_QUERY, { variables: { yyyymmdd }});
    const { data: meData, loading: meLoading } = useQuery(ME);
    const [ focused, setFocused ] = useState( 95 );
    
    if ( !loading && data && data.seeTodayPosts && meData && meData.me && !meLoading ) {
        return (
            <TodayPresenter
                data={data}
                meData={meData}
                focused={focused}
                setFocused={setFocused}
                yyyymmdd={yyyymmdd}
            />
        )
    } else return <Loader />
};