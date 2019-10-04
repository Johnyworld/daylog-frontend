import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextLarge from './TextLarge';
import Theme from '../Styles/Theme';
import Icon from './Icon';

const Container = styled.div`
    display: flex;
    margin-bottom: 30px;
    justify-content: space-between; 
`;

const PopupHeader = ({ text, closePopup, lang }) => {
    return (
        <Container className="popup-header">
            <TextLarge text={text} lang={lang} color={Theme.c_blueDarker2} />
            <button onClick={closePopup}>
                <Icon icon="x" size="medium" />
            </button>
        </Container>
    )
}

PopupHeader.propTypes = {
    closePopup : PropTypes.func,
    lang: PropTypes.string
}

export default PopupHeader;