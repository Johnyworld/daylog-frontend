import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from './Loader';
import GraphContainer from './GraphContainer';
import Review from './Review';
import EachPosts from './EachPosts';

const SEE_WEEKLOG = gql`
    query seeWeekLog( $username: String!, $yyyymmdd: String! ) {
        seeWeekLog( username: $username, yyyymmdd: $yyyymmdd ) {
            weekReviews {
                text
                likesCount
            }
            eachDays {
                yyyymmdd
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
                { !loading && data && data.seeWeekLog && <>
                    <GraphContainer data={data.seeWeekLog.doingLogs} colors={colors} lang={lang} />
                    <Review review={data.seeWeekLog.weekReviews[0]} averageScore={data.seeWeekLog.averageScore} lang={lang} />
                    <EachPosts posts={data.seeWeekLog.eachDays} username={username} lang={lang} />
                </>}
            </Container>
        </>
    )
}