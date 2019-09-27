import React from 'react';
import styled from 'styled-components';
import TextRegular from './TextRegular';
import PropTypes from 'prop-types';
import Theme from '../Styles/Theme';

const Container = styled.button`
    
`;

const SmallButton = ({ onClick, data, text, lang, color=Theme.c_gray }) => {
    return (
        <Container onClick={onClick} data-data={data} >
            <TextRegular text={text} lang={lang} color={color} weight="bold" />
        </Container>
    )
}

SmallButton.propTypes = {
    text : PropTypes.object.isRequired,
    lang : PropTypes.string.isRequired,
    color : PropTypes.any,
    onClick : PropTypes.func,
    data : PropTypes.string
}

export default SmallButton;