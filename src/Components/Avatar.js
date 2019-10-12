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

const Avatar = ({ className, size, avatar }) => {
    let sizePx;

    if (avatar === null || avatar === "") avatar = "https://daylog.s3.ap-northeast-2.amazonaws.com/defaultAvatar.png";

    if ( size === "small" ) sizePx = '32px';
    if ( size === "medium" ) sizePx = '40px';
    if ( size === "large" ) sizePx = '80px';

    return (
        <Container className={className} avatar={avatar} size={sizePx} />
    )
} 

export default Avatar;

Avatar.propTypes = {
    avatar : PropTypes.string,
    size : PropTypes.string.isRequired
}