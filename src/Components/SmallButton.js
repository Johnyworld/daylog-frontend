import React from 'react';
import styled from 'styled-components';
import TextRegular from './TextRegular';
import PropTypes from 'prop-types';
import Theme from '../Styles/Theme';

const Container = styled.button`
    display: inline-block; 
`;

const SmallButton = ({ className, onClick, data, text, lang, color=Theme.c_gray }) => {
    return (
        <Container onClick={onClick} data-data={data} className="small-button" >
            <TextRegular text={text} lang={lang} color={color} weight="bold" />
        </Container>
    )
}

SmallButton.propTypes = {
    className : PropTypes.string,
    onClick : PropTypes.func,
    data : PropTypes.string,
    text : PropTypes.object.isRequired,
    lang : PropTypes.string.isRequired,
    color : PropTypes.any
}

export default SmallButton;