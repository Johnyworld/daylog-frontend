import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Languages from '../Util/Languages';

const Container = styled.span`
    display: inline-block;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.4;
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

const TextRegular = ({ className, text, lang, string, weight="regular", color }) => (
    <Container className={className} weight={weight} color={color} lang={lang} >
        {string}{text && <Languages text={text} lang={lang} /> }
    </Container>
)

TextRegular.propTypes = {
    className : PropTypes.string,
    text : PropTypes.object,
    lang : PropTypes.string,
    string : PropTypes.any,
    weight : PropTypes.string,
    color : PropTypes.string
}

export default TextRegular;