import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconImage from './IconImage';
import TextSmall from './TextSmall';

const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding: 8px 5px;
    width: 72px;
    height: 72px;
    margin-right: 10px;
    border: 1px solid ${({ theme })=> theme.c_gray };
    border-radius: 5px;
    background-color: white;

    &.shadowed {
        box-shadow: 0 3px 3px #0003;
        border: none;
    }

    &.selected {
        border: 3px solid ${({ theme })=> theme.c_blue };
    }

    &.keep:after {
        content: 'keep';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${({ theme })=> theme.c_blue };
        background-color: #08436d;
        color: white;
        padding: 3px 8px;
        border-radius: 1em;
        transform: translate(-20%, -50%);
        font-size: 12px;
    }

    &.pinned:after {
        content: ' ';
        display: block;
        position: absolute;
        width: 16px;
        height: 16px;
        top: 0;
        right: 0;
        background-color: red;
        transform: translate(0, -50%);
    }

    .text-small {
        white-space: nowrap;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const DoingButton = ({ id, name, icon, color, className, onClick }) => {
    const onClickFast = () => {
        console.log(id, name);
    }

    return (
        <Container className={className} onClick={ onClick ? onClick : onClickFast } data-id={id} >
            <IconImage url={icon} size="medium" />
            <TextSmall string={name} color={color} />
        </Container>
    )
}

DoingButton.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    className: PropTypes.string
}

export default DoingButton;