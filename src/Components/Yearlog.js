import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import GraphContainer from './GraphContainer';
import Review from './Review';
import LoaderRelative from './LoaderRelative';

const SEE_YEARLOG = gql`
    query seeYearLog( $username: String!, $yyyymmdd: String! ) {
        seeYearLog( username: $username, yyyymmdd: $yyyymmdd ) {
            averageScore
            doingLogs {
                name
                blocks
                percent
                postsCount
            }
            yearReview {
                id
                text
                likesCount
            }
        }
    }
`;

const Container = styled.section`
    position: relative;
`;

export default ({ username, yyyymmdd, colors, lang }) => {
    const yyyy = yyyymmdd.substr(0, 4);
    const { data, loading } = useQuery( SEE_YEARLOG, { variables: { username, yyyymmdd: yyyy }});

    return (
        <Container>
            { loading && <LoaderRelative /> }
            { !loading && data && data.seeYearLog && <>
                <GraphContainer data={data.seeYearLog.doingLogs} colors={colors} lang={lang} />
                <Review review={data.seeYearLog.yearReview[0]} averageScore={data.seeYearLog.averageScore} username={username} date={yyyy} lang={lang} QUERY={SEE_YEARLOG} />
            </>}
        </Container>
    )
}