import React from 'react'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextRegular from './TextRegular';

const Anchor = styled(Link)`
    display: block;
    ${({ inline })=> inline && `
        display: inline-block; 
        margin-right:5px;
    `};
`;

export default ({ username, inline }) => {
    return (
        <Anchor to={`/log/${username}`} inline={inline} >
            <TextRegular string={username} weight="bold" />
        </Anchor>
    )
}