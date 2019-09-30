import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from './Loader';
import GraphList from './GraphList';
import Graph from './Graph';

const SEE_DAYLOG = gql`
    query seeDayLog( $username: String!, $yyyymmdd: String! ) {
        seeDayLog( username: $username, yyyymmdd: $yyyymmdd ) {
            dayReviews {
                text
                likesCount
            }
            dayComments {
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
    margin-bottom: 30px;
`;

const InfoGraphic = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const GraphContainer = styled.div`
    position: relative;
    width: 35%;
`;

const Lists = styled.ul`
    min-width: 60%;
`;

export default ({ username, yyyymmdd, colors }) => {
    const { data, loading } = useQuery( SEE_DAYLOG, { variables: { username, yyyymmdd }});

    return (
        <Container>
            { loading && <Loader /> }
            { !loading && data && data.seeDayLog &&
                <>
                    <InfoGraphic>
                        <GraphContainer>
                            <Graph data={data.seeDayLog.doingLogs} colors={colors} />
                        </GraphContainer>
                        <Lists>
                            { data.seeDayLog.doingLogs.map((doing, key) => (
                                <GraphList
                                    key={`${key}_${doing.name}`}
                                    index={key}
                                    name={doing.name}
                                    minutes={doing.blocks*15}
                                    percent={doing.percent}
                                    postsCount={doing.postsCount}
                                    colors={colors}
                                />
                            ))}
                        </Lists>
                    </InfoGraphic>
                    
                </>
            }
        </Container>
    )
}