import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextRegular from './TextRegular';

const Container = styled.button`
    background-color: ${({ theme })=> theme.c_blueDarker2 };
    padding: 5px 35px;
    border-radius: 5px;
    color: white;
`;

const Button = ({ onClick, text, lang }) => {
    return (
        <Container onClick={onClick} >
            <TextRegular text={text} lang={lang} />
        </Container>
    )
}

Button.propTypes = {
    text : PropTypes.object.isRequired,
    lang : PropTypes.string.isRequired
}

export default Button;