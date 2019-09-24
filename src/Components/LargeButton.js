import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Languages from '../Lang/Languages';

const Container = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    font-size: 28px;
    padding: 0;
    padding-bottom: 4px;
    border-bottom: 1px solid;
    outline: none;

    ${({ color }) => color === 'white' && `
        color: white;
    `}
`;

const LargeButton = ({ text, lang, color, onClick }) => {
    return (
        <Container color={color} onClick={onClick}>
            <Languages text={text} lang={lang} />
        </Container>
    )
}

LargeButton.propTypes = {
    text : PropTypes.object.isRequired,
    lang : PropTypes.string.isRequired,
    color : PropTypes.string
}

export default LargeButton;