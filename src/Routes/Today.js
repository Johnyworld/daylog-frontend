import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import { TODAY_QUERY, ME } from '../Router';
import { getLang } from '../Util/Languages';

const Container = styled.main`
    ${({ theme })=> theme.mainContainer };
`;

export default () => {
    const { data, loading } = useQuery( TODAY_QUERY );
    const { data: meData, loading: meLoading } = useQuery(ME);

    const lang = getLang( meData && meData.me && !meLoading && meData.me.lang );

    return (
        <Container>
            { loading && <Loader /> }
            { !loading && data && data.seeTodayPosts && 
                <p>Loading Done</p>
            }
        </Container>
    ) 
};