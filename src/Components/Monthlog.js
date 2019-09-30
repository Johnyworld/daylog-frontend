import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from './Loader';
import GraphContainer from './GraphContainer';
import Review from './Review';

const SEE_MONTHLOG = gql`
    query seeMonthLog( $username: String!, $yyyymm: String! ) {
        seeMonthLog( username: $username, yyyymm: $yyyymm ) {
            monthReviews {
                text
                likesCount
            }
            monthComments {
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
    const yyyymm = yyyymmdd.substr(0, 7);
    const { data, loading } = useQuery( SEE_MONTHLOG, { variables: { username, yyyymm }});

    return (
        <Container>
            { loading && <Loader /> }
            { !loading && data && data.seeMonthLog && <>
                <GraphContainer data={data.seeMonthLog.doingLogs} colors={colors} lang={lang} />
                <Review review={data.seeMonthLog.monthReviews[0]} averageScore={data.seeMonthLog.averageScore} lang={lang} />
            </>}
        </Container>
    )
}