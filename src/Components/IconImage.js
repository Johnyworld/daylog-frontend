import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    ${({ url, theme })=> url 
        ? `background-image: url(${url});` 
        : `background-color: ${theme.c_lightGray}; border-radius: 50%;` }
    background-size: cover;
    width: ${({ size })=> `${size}px`};
    height: ${({ size })=> `${size}px`};
`;

const IconImage = ({ url, size }) => {
    let sizeNum;

    if ( size === "small" ) sizeNum = 16;
    if ( size === "medium" ) sizeNum = 24;

    return (
        <Container url={url} size={sizeNum} />
    )
}

IconImage.propTypes = {
    url: PropTypes.string,
    size: PropTypes.oneOf([ 'small', 'medium' ]).isRequired
}

export default IconImage;