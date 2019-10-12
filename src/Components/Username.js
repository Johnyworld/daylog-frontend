import React from 'react'; 
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextRegular from './TextRegular';

const Anchor = styled(Link)`
    display: block;
    ${({ inline })=> inline && `
        display: inline-block; 
        margin-right:5px;
    `};
`;

const Username = ({ username, inline }) => {
    return (
        <Anchor to={`/feed/${username}`} inline={inline} >
            <TextRegular string={username} weight="bold" />
        </Anchor>
    )
}

Username.propTypes = {
    username: PropTypes.string.isRequired,
    inline: PropTypes.bool
}

export default Username;