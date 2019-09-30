import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
    display: inline-block;
    font-size: ${({ size }) => size };
    font-weight: 100;
    line-height: 1;
`;
export default ({ score, size }) => {
    let sizeNum;
    if ( size === "medium" ) sizeNum = "28px";
    if ( size === "large" ) sizeNum = "50px";
    
    if ( score === parseInt(score) ) score = `${score}.0`;
    
    return (
        <Container size={sizeNum}>
            {score}
        </Container>
    )
}