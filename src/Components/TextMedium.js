import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Languages from '../Lang/Languages';

const Container = styled.p`
    font-size: 16px;
    line-height: 1.4;
    ${({ weight }) => weight === 'bold' && ` 
        font-weight: 700;
    `}
    ${({ lang }) => lang === 'kr' && ` 
        letter-spacing: -.05em;
    `}
    ${({ color }) => color && ` 
        color: ${ color };
    `}
`;

const TextMedium = ({ text, lang, string, weight="regular", color }) => (
    <Container weight={weight} color={color} lang={lang} >
        {string}<Languages text={text} lang={lang} />
    </Container>
)

TextMedium.propTypes = {
    text : PropTypes.object,
    lang : PropTypes.string,
    string : PropTypes.string,
    weight : PropTypes.string,
    color : PropTypes.string
}

export default TextMedium;