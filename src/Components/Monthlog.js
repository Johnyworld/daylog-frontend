import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import GraphContainer from './GraphContainer';
import Review from './Review';
import Reviews from './Reviews';
import LoaderRelative from './LoaderRelative';
import { getLangArray } from '../Util/Languages';

const SEE_MONTHLOG = gql`
    query seeMonthLog( $username: String!, $yyyymmdd: String! ) {
        seeMonthLog( username: $username, yyyymmdd: $yyyymmdd ) {
            monthReview {
                id
                text
                likesCount
                commentsCount
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

const Monthlog = ({ username, yyyymmdd, colors, lang, me }) => {
    const yyyymm = yyyymmdd.substr(0, 7);
    const { data, loading } = useQuery( SEE_MONTHLOG, { variables: { username, yyyymmdd: yyyymm }});

    return (
        <Container>
            { loading && <LoaderRelative /> }
            { !loading && data && data.seeMonthLog && <>
                <GraphContainer data={data.seeMonthLog.doingLogs} colors={colors} lang={lang} />
                <Review review={data.seeMonthLog.monthReview[0]} averageScore={data.seeMonthLog.averageScore} username={username} date={yyyymm} lang={lang} QUERY={SEE_MONTHLOG} me={me} />
                { data.seeMonthLog.eachReviews[0] &&
                    <Reviews reviews={data.seeMonthLog.eachReviews} date={yyyymm} lang={lang} />
                }
            </>}
        </Container>
    )
}

Monthlog.propTypes = {
    username : PropTypes.string.isRequired,
    yyyymmdd : PropTypes.string.isRequired,
    colors : PropTypes.array.isRequired,
    lang: PropTypes.oneOf( getLangArray() )
}

export default Monthlog;