import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from './Loader';
import GraphContainer from './GraphContainer';
import Review from './Review';

const SEE_DAYLOG = gql`
    query seeDayLog( $username: String!, $yyyymmdd: String! ) {
        seeDayLog( username: $username, yyyymmdd: $yyyymmdd ) {
            dayReviews {
                text
                likesCount
            }
            dayComments {
                id
                text
                createdAt
                user {
                    avatar
                    username
                }
                post {
                    id
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

export default ({ username, yyyymmdd, colors, lang, printDate }) => {
    const { data, loading } = useQuery( SEE_DAYLOG, { variables: { username, yyyymmdd }});

    return (
        <Container>
            { loading && <Loader /> }
            { !loading && data && data.seeDayLog && <>
                <GraphContainer data={data.seeDayLog.doingLogs} colors={colors} lang={lang} />
                <Review review={data.seeDayLog.dayReviews[0]} averageScore={data.seeDayLog.averageScore} lang={lang} />
                {/* <Comments comments={data.seeDayLog.dayComments} me={me} lang={lang} /> */}
            </>}
        </Container>
    )
}