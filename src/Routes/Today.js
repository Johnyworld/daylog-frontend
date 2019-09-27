import React from 'react';
import styled from 'styled-components';
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

const Container = styled.main`

`;

export default () => {
    const { data, loading } = useQuery( TODAY_QUERY );

    return <>
        { loading && <Loader /> }
        { !loading && data && data.seeTodayPosts && 
            <Container>
                Loading Done
            </Container>
        }
    </>
};