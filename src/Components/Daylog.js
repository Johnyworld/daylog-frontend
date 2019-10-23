import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import GraphContainer from './GraphContainer';
import Review from './Review';
import LoaderRelative from './LoaderRelative';
import { getLangArray } from '../Util/Languages';
import TimeTable from './TimeTable';

export const SEE_DAYLOG = gql`
    query seeDayLog( $username: String!, $yyyymmdd: String! ) {
        seeDayLog( username: $username, yyyymmdd: $yyyymmdd ) {
            dayReviews {
                id
                text
                likesCount
            }
            averageScore
            doingLogs {
                name
                blocks
                percent
                postsCount
            }
            posts {
                id
                startAt
                endAt
                yyyymmdd
                doing {
                    id
                    name
                    color
                }
            }
        }
    }
`;

const Container = styled.section`
    position: relative;
`;

const Daylog = ({ username, yyyymmdd, colors, lang }) => {
    const { data, loading } = useQuery( SEE_DAYLOG, { variables: { username, yyyymmdd }});

    return (
        <Container>
            { loading && <LoaderRelative /> }
            { !loading && data && data.seeDayLog && <>
                <GraphContainer data={data.seeDayLog.doingLogs} colors={colors} lang={lang} />
                <Review review={data.seeDayLog.dayReviews[0]} averageScore={data.seeDayLog.averageScore} username={username} date={yyyymmdd} lang={lang} QUERY={SEE_DAYLOG} />
                { data.seeDayLog.posts[0] &&
                    <TimeTable posts={data.seeDayLog.posts} yyyymmdd={yyyymmdd} lang={lang} />
                }
            </>}
        </Container>
    )
}

Daylog.propTypes = {
    username : PropTypes.string.isRequired,
    yyyymmdd : PropTypes.string.isRequired,
    colors : PropTypes.array.isRequired,
    lang: PropTypes.oneOf( getLangArray() )
}

export default Daylog;