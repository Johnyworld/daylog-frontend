import React from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json';
import useInput from '../Hooks/useInput';
import Input from './Input';
import Theme from '../Styles/Theme';
import LargeButton from './LargeButton';

const Container = styled.div`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const LargeButtonStyled = styled(LargeButton)`
    display: block;
    margin-top: 30px;
    margin-left: auto;
`;

export default ({ id, location, lang, editLocation, closePopup }) => {
    const inputLocation = useInput(location);

    const onClickSubmit = () => {
        editLocation( id, inputLocation.value );
        closePopup();
    }

    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.editLocation} closePopup={closePopup} lang={lang} />
                <Input placeholder={Words.location} {...inputLocation} lang={lang} />
                <LargeButtonStyled text={Words.okay} lang={lang} onClick={onClickSubmit} color={Theme.c_blue} />
            </Popup>
        </Container>
    )
}