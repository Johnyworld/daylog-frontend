import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from './Loader';
import GraphContainer from './GraphContainer';
import Review from './Review';
import Reviews from './Reviews';

const SEE_MONTHLOG = gql`
    query seeMonthLog( $username: String!, $yyyymmdd: String! ) {
        seeMonthLog( username: $username, yyyymmdd: $yyyymmdd ) {
            monthReview {
                id
                text
                likesCount
            }
            eachReviews {
                id
                text
                likesCount
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
    const yyyymm = yyyymmdd.substr(0, 7);
    const { data, loading } = useQuery( SEE_MONTHLOG, { variables: { username, yyyymmdd: yyyymm }});

    return (
        <Container>
            { loading && <Loader /> }
            { !loading && data && data.seeMonthLog && <>
                <GraphContainer data={data.seeMonthLog.doingLogs} colors={colors} lang={lang} />
                <Review review={data.seeMonthLog.monthReview[0]} averageScore={data.seeMonthLog.averageScore} username={username} date={yyyymm} lang={lang} QUERY={SEE_MONTHLOG} />
                { data.seeMonthLog.eachReviews[0] &&
                    <Reviews reviews={data.seeMonthLog.eachReviews} date={yyyymm} lang={lang} />
                }
            </>}
        </Container>
    )
}