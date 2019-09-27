import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';

const TODAY_QUERY = gql`
    {
       seeTodayPosts {
            doing {
                name
            }
            likesCount
            commentsCount
            isLiked
            score
            startAt
            endAt
        }
    } 
`;

const ME = gql`
    {
        me {
            username
            avatar
            fullname
            email
            bio
        }
    }
`;

const Container = styled.main`

`;

export default () => {
    const { data: meData, loading: meLoading } = useQuery(ME);
    const { data, loading } = useQuery( TODAY_QUERY );

    if ( !meLoading && meData && meData.me ) {
        sessionStorage.setItem('me', JSON.stringify(meData.me));
    }

    return (
        <>
            <Header page="today" />
            { loading && <Loader /> }
            { !loading && data && data.seeTodayPosts && 
                <Container>
                    Loading Done
                </Container>
            }
        </>
    )
};