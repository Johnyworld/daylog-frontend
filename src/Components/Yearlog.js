import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from './Loader';
import GraphContainer from './GraphContainer';

const SEE_YEARLOG = gql`
    query seeYearLog( $username: String!, $yyyy: String! ) {
        seeYearLog( username: $username, yyyy: $yyyy ) {
            averageScore
            doingLogs {
                name
                blocks
                percent
                postsCount
            }
        }
    }
`;

const Container = styled.section`
    position: relative;
`;

export default ({ username, yyyymmdd, colors }) => {
    const yyyy = yyyymmdd.substr(0, 4);
    const { data, loading } = useQuery( SEE_YEARLOG, { variables: { username, yyyy }});

    return (
        <Container>
            { loading && <Loader /> }
            { !loading && data && data.seeYearLog &&
                <GraphContainer data={data.seeYearLog} colors={colors} />
            }
        </Container>
    )
}