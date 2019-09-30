import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from './Loader';
import GraphContainer from './GraphContainer';
import Review from './Review';

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
            yearReviews {
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
    const { data, loading } = useQuery( SEE_YEARLOG, { variables: { username, yyyy }});

    return (
        <Container>
            { loading && <Loader /> }
            { !loading && data && data.seeYearLog && <>
                <GraphContainer data={data.seeYearLog.doingLogs} colors={colors} lang={lang} />
                <Review review={data.seeYearLog.yearReviews[0]} averageScore={data.seeYearLog.averageScore} lang={lang} />
            </>}
        </Container>
    )
}