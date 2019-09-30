import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Languages from '../Util/Languages';

const Container = styled.h2`
    font-size: 28px;
    line-height: 1.2;
    ${({ color })=> color && ` color: ${ color }; `}
    ${({ lang })=> { if ( lang === "kr" ) return `margin-left: -.1em;`; }}
`;

const TextLarge = ({ text, lang, string, color }) => (
    <Container color={color} lang={lang} className="text-large" >
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