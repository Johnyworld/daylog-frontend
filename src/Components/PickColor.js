import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PopupHeader from './PopupHeader';
import PickGrid from './PickGrid';
import { getLangArray } from '../Util/Languages';
import useInput from '../Hooks/useInput';
import Words from '../Lang/Words';
import Input from './Input';
import TextRegular from './TextRegular';
import TextMedium from './TextMedium';
import Theme from '../Styles/Theme';

const SideWindow = styled.div`
    ${({ theme })=> theme.sidePopup };
`;

const MenualUpload = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Palette = styled.div`
    width: 24px;
    height: 24px;
    background-color: ${({ color })=> color };
`;

const InputField = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PickColor = ({ array, sideWindow, closePopup, onClick, text, lang, className }) => {
    const hex = useInput('000000');

    const hexSubmit = () => {
        const isHex = /^[a-f0-9]{3,6}$/;
        if ( isHex.test(hex.value) ) onClick(`#${hex.value}`);
    }

    return (
        <SideWindow className={ className + (sideWindow === "color" ? " show" : "") } >
            <PopupHeader text={text} lang={lang} closePopup={closePopup} />
            <PickGrid type={sideWindow} array={array} onClick={onClick} />
            <MenualUpload>
                <TextRegular text={Words.enterManually} lang={lang} weight="bold" />
                <InputField>
                    <TextMedium string="#" color={Theme.c_gray} weight="bold" />
                    <Input {...hex} placeholder={Words.enterManually} lang={lang} />
                </InputField>
                <button onClick={hexSubmit}>
                    <Palette color={`#${hex.value}`} />
                </button>
            </MenualUpload>
        </SideWindow>
    )
}

PickColor.propTypes = {
    array: PropTypes.array.isRequired,
    sideWindow: PropTypes.oneOf([ 'icon', 'color' ]).isRequired,
    closePopup: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.object.isRequired,
    lang: PropTypes.oneOf( getLangArray() )
}

export default PickColor;