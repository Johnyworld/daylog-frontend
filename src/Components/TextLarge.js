import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Languages from '../Util/Languages';

const Container = styled.h2`
    font-size: 28px;
    line-height: 1.2;
    margin-left: -.1em;
    ${({ color }) => color && ` 
        color: ${ color };
    `}
`;

const TextLarge = ({ text, lang, string, color }) => (
    <Container color={color} >
        {string}{text && <Languages text={text} lang={lang} /> }
    </Container>
)

TextLarge.propTypes = {
    text : PropTypes.object,
    lang : PropTypes.string,
    string : PropTypes.string,
    color : PropTypes.string
}

export default TextLarge;