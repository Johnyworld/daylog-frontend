import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from './Loader';
import GraphList from './GraphList';
import Graph from './Graph';
import GraphContainer from './GraphContainer';

const SEE_DAYLOG = gql`
    query seeDayLog( $username: String!, $yyyymmdd: String! ) {
        seeDayLog( username: $username, yyyymmdd: $yyyymmdd ) {
            dayReviews {
                text
                likesCount
            }
            dayComments {
                text
                createdAt
                user {
                    avatar
                    username
                }
            }
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
    margin-bottom: 30px;
`;


export default ({ username, yyyymmdd, colors }) => {
    const { data, loading } = useQuery( SEE_DAYLOG, { variables: { username, yyyymmdd }});

    return (
        <Container>
            { loading && <Loader /> }
            { !loading && data && data.seeDayLog &&
                <GraphContainer data={data.seeDayLog} colors={colors} />
            }
        </Container>
    )
}