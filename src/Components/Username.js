import React from 'react'; 
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextRegular from './TextRegular';
import TextSmall from './TextSmall';

const Anchor = styled(Link)`
    display: block;
    ${({ inline })=> inline && `
        display: inline-block; 
        margin-right:5px;
    `};
`;

const Username = ({ username, inline, size }) => {
    return (
        <Anchor to={`/feed/${username}`} inline={inline} >
            { size 
                ? size === "small" && <TextSmall string={username} />
                : <TextRegular string={username} weight="bold" />
            }
        </Anchor>
    )
}

Username.propTypes = {
    username: PropTypes.string.isRequired,
    inline: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.oneOf([ "small" ])
}

export default Username;