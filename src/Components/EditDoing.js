import React, { useState } from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json';
import PickColor from './PickColor';
import Colors from '../Util/Colors';
import Icons from '../Util/Icons';
import PickIcon from './PickIcon';
import LargeButton from './LargeButton';
import Theme from '../Styles/Theme';
import InputDisabled from './InputDisabed';
import Picker from './Picker';
import SmallButton from './SmallButton';

const Container = styled.section`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const PopupContent = styled.section`
   ${({ theme })=> theme.popupContent }; 
`;

const Field = styled(InputDisabled)`
    margin-top: 10px;
`;

const PickerStyled = styled(Picker)`
    margin-top: 5px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const LargeButtonStyled = styled(LargeButton)`
    display: block;
    margin-left: auto;
    margin-top: 50px;
`;

const EditDoing = ({ 
    id, author, category, doingName, defaultIcon, defaultColor, me, lang,
    editDoing, removePin, closePopup }) => {
    const [ sideWindow, setSideWindow ] = useState(null);
    const [ icon, setIcon ] = useState(defaultIcon);
    const [ color, setColor ] = useState(defaultColor);

    const onClickSideWindow = (option) => {
        setSideWindow(option);
    }

    const closeSideWindow = () => {
        setSideWindow(null);
    }

    const pickColor = (hex) => {
        setColor(hex);
        setSideWindow(null); 
    }

    const pickIcon = (url) => {
        setIcon(url);
        setSideWindow(null);  
    }

    const onClickDelete = () => {
        removePin({ doingId: id });
        closePopup();
    }

    const onClickSubmit = () => {
        editDoing({ id, color, icon });
        closePopup();
    }

    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.editDoing} remark={Words.editDoingRemark} lang={lang} closePopup={closePopup} />
                <PopupContent>
                    <Field label={Words.category} field={category.lang} lang={lang} />
                    <Field label={Words.doingName} field={doingName} lang={lang} />
                    <PickerStyled onClick={onClickSideWindow} type="icon" icon={icon} lang={lang} isMine={me.id===author.id} />
                    <PickerStyled onClick={onClickSideWindow} type="color" color={color} lang={lang} isMine={me.id===author.id} />
                    <Buttons>
                        <SmallButton text={Words.delete} lang={lang} color={Theme.c_red} onClick={onClickDelete} />
                        <LargeButtonStyled text={Words.okay} lang={lang} color={Theme.c_blue} onClick={onClickSubmit} />
                    </Buttons>
                </PopupContent>
                <PickColor
                    type="color"
                    array={Colors}
                    sideWindow={sideWindow}
                    closePopup={closeSideWindow}
                    onClick={pickColor}
                    text={Words.colors}
                    lang={lang}
                />
                <PickIcon
                    type="icon"
                    array={Icons}
                    sideWindow={sideWindow}
                    closePopup={closeSideWindow}
                    onClick={pickIcon}
                    text={Words.icon}
                    lang={lang}
                />
            </Popup>
        </Container>
    )
}

export default EditDoing;