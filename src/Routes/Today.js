import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import { TODAY_QUERY } from '../Components/Router';

const Container = styled.main`
    ${({ theme })=> theme.mainContainer };
`;

export default () => {
    const { data, loading } = useQuery( TODAY_QUERY );

    return (
        <Container>
            { loading && <Loader /> }
            { !loading && data && data.seeTodayPosts && 
                <p>Loading Done</p>
            }
        </Container>
    ) 
};