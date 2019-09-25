import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    ${({ size }) => (`
        width: ${size};
        height: ${size};
        min-width: ${size};
        min-height: ${size};
    `)}
    border-radius: 50%;
    background-image: ${({ avatar })=> `url(${avatar})` };
    background-size: cover;
`;

const Avatar = ({ avatar, size }) => {
    let sizePx;
    
    if ( size === "small" ) sizePx = '32px';
    if ( size === "medium" ) sizePx = '40px';
    if ( size === "large" ) sizePx = '60px';

    return (
        <Container avatar={avatar} size={sizePx} />
    )
} 

export default Avatar;

Avatar.propTypes = {
    avatar : PropTypes.string,
    size : PropTypes.string.isRequired
}