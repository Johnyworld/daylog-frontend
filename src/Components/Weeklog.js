import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import GraphContainer from './GraphContainer';
import Review from './Review';
import EachPosts from './EachPosts';
import { getWeek } from '../Util/Convertors';
import LoaderRelative from './LoaderRelative';
import { getLangArray } from '../Util/Languages';

const SEE_WEEKLOG = gql`
    query seeWeekLog( $username: String!, $yyyymmdd: String! ) {
        seeWeekLog( username: $username, yyyymmdd: $yyyymmdd ) {
            weekReviews {
                id
                text
                likesCount
                commentsCount
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

const Weeklog = ({ username, yyyymmdd, colors, lang, me }) => {
    const { data, loading } = useQuery( SEE_WEEKLOG, { variables: { username, yyyymmdd }});
    const yyyymmWeek = getWeek(yyyymmdd);

    return (
        <>
            <Container>
                { loading && <LoaderRelative /> }
                { !loading && data && data.seeWeekLog && <>
                    <GraphContainer data={data.seeWeekLog.doingLogs} colors={colors} lang={lang} />
                    <Review review={data.seeWeekLog.weekReviews[0]} averageScore={data.seeWeekLog.averageScore} username={username} date={yyyymmdd} weekDate={yyyymmWeek} lang={lang} QUERY={SEE_WEEKLOG} me={me} />
                    <EachPosts posts={data.seeWeekLog.eachDays} username={username} lang={lang} />
                </>}
            </Container>
        </>
    )
}

Weeklog.propTypes = {
    username : PropTypes.string.isRequired,
    yyyymmdd : PropTypes.string.isRequired,
    colors : PropTypes.array.isRequired,
    lang: PropTypes.oneOf( getLangArray() )
}

export default Weeklog;