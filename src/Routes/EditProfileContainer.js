import React from 'react';
import Loader from '../Components/Loader';
import EditProfile from './EditProfile';
import { useQuery } from 'react-apollo-hooks';
import { ME } from '../Components/TodayQueries';

export default () => {
    const { data, loading } = useQuery(ME);
    
    if ( !loading && data && data.me ) {
        return (
            <EditProfile me={data.me} />
        )
    } else return <Loader />
}