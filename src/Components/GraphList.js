import React from 'react';
import styled from 'styled-components';
import TextSmall from './TextSmall';

const Container = styled.li`
    display: flex;
    justify-content: space-between;
`;

const Name = styled.div`
    display: flex;
    align-items: center;
`;

const Color = styled.div`
    display: inline-block;
    height: 12px;
    width: 3px;
    margin-right: 10px;
    background-color: ${({ color })=> color };
`;

export default ({ name, index, minutes, percent, postsCount, colors }) => {
    

    return (
        <Container>
            <Name>
                <Color color={colors[index]} />
                <TextSmall string={name} />
            </Name>
            <TextSmall string={`${percent}%`} />
        </Container>
    )
}