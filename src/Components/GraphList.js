import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextSmall from './TextSmall';
import { blockToTimeFor } from '../Util/Convertors';
import { getLangArray } from '../Util/Languages';

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

const Number = styled.p`
    position: relative;
    min-width: 35%;
`;

const Unit = styled(TextSmall)`
    position: absolute;
    right: 0;
    opacity: ${props => props.showing? 1:0};
    transition: .5s;
`

const GraphList = ({ name, index, blocks, percent, colors, unit, lang }) => {
    const time = blockToTimeFor( blocks, lang );
    
    return (
        <Container>
            <Name>
                <Color color={colors[index]} />
                <TextSmall string={name} />
            </Name>
            <Number>
                <Unit string={`${percent}%`} showing={unit==='percent'} />
                <Unit string={time} showing={unit==='time'} />
            </Number>
        </Container>
    )
}

GraphList.propTypes = {
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    blocks: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
    colors: PropTypes.array.isRequired,
    unit: PropTypes.oneOf([ 'percent', 'time' ]),
    lang: PropTypes.oneOf( getLangArray() )
}

export default GraphList;