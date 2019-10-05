import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
    display: inline-block;
    font-size: ${({ size }) => size };
    font-weight: 100;
    line-height: 1;
    ${({ color })=> color && `color: ${color};`};
`;
export default ({ score, size, color }) => {
    let sizeNum;
    if ( size === "medium" ) sizeNum = "28px";
    if ( size === "large" ) sizeNum = "50px";
    if ( size === "small" ) sizeNum = "21px";
    
    if ( score === parseInt(score) ) score = `${score}.0`;
    
    return (
        <Container size={sizeNum} color={color} >
            {score}
        </Container>
    )
}