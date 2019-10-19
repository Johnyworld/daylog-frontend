import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';
import Theme from '../Styles/Theme';

const Container = styled.button`
    width: ${({ size })=> size }px;
    height: ${({ size })=> size }px;
`;

const IconButton = ({ className, icon, size, color, onClick }) => {

    let sizeNum;
    if ( size === "small" ) sizeNum = Theme.size_iconSmall;
    if ( size === "medium" ) sizeNum = Theme.size_iconMedium;

    return (
        <Container className={className} size={sizeNum} onClick={onClick} >
            <Icon icon={icon} size={size} color={color} />
        </Container>
    )
}

IconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.oneOf([ "small", "medium" ]).isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default IconButton;