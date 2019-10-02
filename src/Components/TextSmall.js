import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Languages from '../Util/Languages';

const Container = styled.span`
    font-size: 12px;
    line-height: 1.4;
    color: ${({ theme })=> theme.c_gray };
    ${({ weight }) => weight === 'bold' && ` 
        font-weight: 700;
    `}
    ${({ lang }) => lang === 'kr' && ` 
        letter-spacing: -.03em;
    `}
    ${({ color }) => color && ` 
        color: ${ color };
    `}
`;

const TextSmall = ({ text, lang, string, weight="regular", color }) => (
    <Container weight={weight} color={color} lang={lang} className="text-small" >
        {string}{text && <Languages text={text} lang={lang} /> }
    </Container>
)

TextSmall.propTypes = {
    text : PropTypes.object,
    lang : PropTypes.string,
    string : PropTypes.any,
    weight : PropTypes.string,
    color : PropTypes.string
}

export default TextSmall;