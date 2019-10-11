import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextRegular from './TextRegular';
import { Link } from 'react-router-dom';

const Container = styled.button`
    background-color: ${({ theme })=> theme.c_blueDarker2 };
    padding: 5px 35px;
    border-radius: 5px;
    color: white;
    &.narrow {
        padding: 5px 15px;
    }
`;

const LinkStyled = styled(Link)`
    display: block;
    background-color: ${({ theme })=> theme.c_blueDarker2 };
    padding: 5px 35px;
    border-radius: 5px;
    color: white; 
    &.narrow {
        padding: 5px 15px;
    }
`;

const Button = ({ onClick, text, lang, to, className }) => {
    if ( to ) {
        return (
            <LinkStyled to={to} className={className} >
                <TextRegular text={text} lang={lang} />
            </LinkStyled>
        )
    } else {
        return (
            <Container onClick={onClick} className={className} >
                <TextRegular text={text} lang={lang} />
            </Container>
        )
    }
}

Button.propTypes = {
    onClick : PropTypes.func,
    text : PropTypes.object.isRequired,
    lang : PropTypes.string.isRequired,
    to : PropTypes.string
}

export default Button;