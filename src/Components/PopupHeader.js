import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextLarge from './TextLarge';
import Icon from './Icon';
import TextSmall from './TextSmall';
import { getLangArray } from '../Util/Languages';

const Container = styled.div`
    display: flex;
    margin-bottom: 30px;
    justify-content: space-between; 
    align-items: flex-start;
`;

const PopupHeader = ({ className, text, remark, closePopup, lang }) => {
    return (
        <Container className={className}>
            <div>
                <TextLarge text={text} lang={lang} />
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
    lang: PropTypes.oneOf( getLangArray() )
}

export default PopupHeader;