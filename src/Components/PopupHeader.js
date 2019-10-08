import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextLarge from './TextLarge';
import Theme from '../Styles/Theme';
import Icon from './Icon';
import TextSmall from './TextSmall';

const Container = styled.div`
    display: flex;
    margin-bottom: 30px;
    justify-content: space-between; 
    align-items: flex-start;
`;

const PopupHeader = ({ text, remark, closePopup, lang }) => {
    return (
        <Container className="popup-header">
            <div>
                <TextLarge text={text} lang={lang} color={Theme.c_blueDarker2} />
                { remark && <TextSmall text={remark} lang={lang} /> }
            </div>
            <button onClick={closePopup}>
                <Icon icon="x" size="medium" />
            </button>
        </Container>
    )
}

PopupHeader.propTypes = {
    text: PropTypes.object.isRequired,
    remark: PropTypes.object, 
    closePopup : PropTypes.func,
    lang: PropTypes.string
}

export default PopupHeader;