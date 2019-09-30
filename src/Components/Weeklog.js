import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from './Loader';
import GraphContainer from './GraphContainer';

const SEE_WEEKLOG = gql`
    query seeWeekLog( $username: String!, $yyyymmdd: String! ) {
        seeWeekLog( username: $username, yyyymmdd: $yyyymmdd ) {
            weekReviews {
                text
                likesCount
            }
            weekComments {
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
`;

export default ({ username, yyyymmdd, colors, lang }) => {
    const { data, loading } = useQuery( SEE_WEEKLOG, { variables: { username, yyyymmdd }});

    return (
        <>
            <Container>
                { loading && <Loader /> }
                { !loading && data && data.seeWeekLog &&
                    <GraphContainer data={data.seeWeekLog} colors={colors} />
                }
            </Container>
        </>
    )
}