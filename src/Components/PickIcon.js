import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PopupHeader from './PopupHeader';
import PickGrid from './PickGrid';
import { getLangArray, languages } from '../Util/Languages';
import Words from '../Lang/Words';
import Input from './Input';
import useInput from '../Hooks/useInput';
import axios from 'axios';
import IconImage from './IconImage';
import TextSmall from './TextSmall';
import TextRegular from './TextRegular';
import Theme from '../Styles/Theme';

const SideWindow = styled.div`
    ${({ theme })=> theme.sidePopup };
`;

const MenualUpload = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid ${({ theme })=> theme.c_lightGray };

    input[type="file"] { 
        visibility: hidden;
        position: absolute;
    }
`;

const InputFile = styled(Input)`
    margin-right: 30px;
`;

const UrlView = styled(TextSmall)`
    width: 50%;
    overflow-x: scroll;
`;

const PickIcon = ({ array, sideWindow, closePopup, onClick, text, lang, className }) => {
    const fileUrl = useInput('');
    const [ fileName, setFileName ] = useState('');

    const urlSubmit = () => {
        // eslint-disable-next-line no-useless-escape
        const isUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w_\.-]*)*\/?$/;
        if ( isUrl.test(fileUrl.value) ) onClick(fileUrl.value);
    }

    const onChangeIconFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('iconFile', e.target.files[0]);
        const config = {
            headers: { 'content-type' : 'multipart/form-data'}
        };

        const url = process.env.REACT_APP_BACKEND_URL + "/upload-icon"
        axios.post(url, formData, config)
            .then(response => {
                fileUrl.setValue(response.data.Location);
                setFileName(response.data.originalname);
            })
            .catch(()=>{ alert( languages(Words.failToUpload, lang)); });
    }

    return (
        <SideWindow className={ className + (sideWindow === "icon" ? " show" : "") } >
            <PopupHeader text={text} lang={lang} closePopup={closePopup} />
            <PickGrid type='icon' array={array} onClick={onClick} />
            <MenualUpload>
                <label htmlFor="iconFile">
                    <TextRegular text={Words.uploadManually} lang={lang} weight="bold" color={Theme.c_blue} />
                </label>
                <InputFile placeholder={Words.uploadManually} onChange={onChangeIconFile} lang={lang} type="file" accept="image/*" name="iconFile" id="iconFile" />
                <UrlView string={fileName} />
                <button onClick={urlSubmit}>
                    <IconImage url={fileUrl.value} size="medium" />
                </button>
            </MenualUpload>
        </SideWindow>
    )
}

PickIcon.propTypes = {
    array: PropTypes.array.isRequired,
    sideWindow: PropTypes.oneOf([ 'icon', 'color' ]),
    closePopup: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.object.isRequired,
    lang: PropTypes.oneOf( getLangArray() )
}

export default PickIcon;