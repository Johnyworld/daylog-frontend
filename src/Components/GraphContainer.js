import React from 'react';
import styled from 'styled-components';
import Graph from './Graph';
import GraphList from './GraphList';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const GraphWrap = styled.div`
    position: relative;
    width: 35%;
`;

const Lists = styled.ul`
    min-width: 60%;
`;

export default ({ data, colors }) => {
    return (
        <Container>
            <GraphWrap>
                <Graph data={data.doingLogs} colors={colors} />
            </GraphWrap>
            <Lists>
                { data.doingLogs.map((doing, key) => (
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
        </Container>
    )   
}