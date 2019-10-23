import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import { TODAY_QUERY, ME } from '../Components/TodayQueries';
import TodayPresenter from '../Components/TodayPresenter';

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