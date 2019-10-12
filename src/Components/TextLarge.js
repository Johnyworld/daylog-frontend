import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Languages from '../Util/Languages';

const Container = styled.h2`
    font-size: 24px;
    line-height: 1.2;
    white-space: nowrap;
    ${({ color })=> color && ` color: ${ color }; `}
    ${({ lang })=> { if ( lang === "kr" ) return `
        margin-left: -.1em;
        letter-spacing: -.02em;
    `;}}
`;

const TextLarge = ({ className, text, lang, string, color }) => (
    <Container className={className} color={color} lang={lang} >
        {string}{text && <Languages text={text} lang={lang} /> }
    </Container>
)

TextLarge.propTypes = {
    text : PropTypes.object,
    lang : PropTypes.string,
    string : PropTypes.any,
    color : PropTypes.string
}

export default TextLarge;