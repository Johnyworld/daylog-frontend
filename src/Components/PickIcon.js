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
import LoaderButton from './LoaderButton';

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

const Label = styled.label`
    cursor: pointer;
`;

const InputFile = styled(Input)`
    margin-right: 30px;
`;

const UrlView = styled(TextSmall)`
    width: 50%;
    overflow-x: scroll;
`;

const UplodedImage = styled.button`
    position: relative;

    &::after {
        content: ' ';
        display: block;
        position: absolute;
        border-right: 2px solid ${({ theme })=> theme.c_red };
        border-bottom: 2px solid ${({ theme })=> theme.c_red };
        transform: rotate(45deg) translateX(-50%);
        top: -5px;
        left: 45%;
        width: 5px;
        height: 5px;
        visibility: hidden;
    }

    &::before {
        content: 'click';
        font-size: 10px;
        color: ${({ theme })=> theme.c_red }; 
        position: absolute;
        transform: translate(-50%, 0);
        top: -20px;
        left: 50%;
        visibility: hidden;
        animation: floating 2s infinite;
    }

    ${({ url })=> url && `
        &::after { visibility: visible; }
        &::before { visibility: visible; }
    `};

    @keyframes floating {
        0% {
            transform: translate(-50%, 0);
        }
        50% {
            transform: translate(-50%, -4px);
        }
        100% {
            transform: translate(-50%, 0);
        }
    }
`;

const PickIcon = ({ array, sideWindow, closePopup, onClick, text, lang, className }) => {
    const fileUrl = useInput('');
    const [ fileName, setFileName ] = useState('');
    const [ uploading, setUploading ] = useState(false);

    const urlSubmit = () => {
        // eslint-disable-next-line no-useless-escape
        const isUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w_\.-]*)*\/?$/;
        if ( isUrl.test(fileUrl.value) ) onClick(fileUrl.value);
    }

    const onChangeIconFile = (e) => {
        e.preventDefault();
        setUploading(true);

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
                setUploading(false);
            })
            .catch(()=>{ 
                setUploading(false);
                alert( languages(Words.failToUpload, lang));
            });
    }

    return (
        <SideWindow className={ className + (sideWindow === "icon" ? " show" : "") } >
            <PopupHeader text={text} lang={lang} closePopup={closePopup} />
            <PickGrid type='icon' array={array} onClick={onClick} />
            <MenualUpload>
                <Label htmlFor="iconFile">
                    <TextRegular text={Words.uploadManually} lang={lang} weight="bold" color={Theme.c_blue} />
                </Label>
                <InputFile placeholder={Words.uploadManually} onChange={onChangeIconFile} lang={lang} type="file" accept="image/*" name="iconFile" id="iconFile" capture="camera" />
                <UrlView string={fileName} />
                { uploading 
                    ? <LoaderButton />
                    : <UplodedImage onClick={urlSubmit} url={fileUrl.value !== ""} >
                        <IconImage url={fileUrl.value} size="medium" />
                    </UplodedImage>
                }
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