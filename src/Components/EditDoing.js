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
import TextSmall from './TextSmall';
import Username from './Username';
import IconButton from './IconButton';

const Container = styled.section`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const PopupContent = styled.section` `;

const Field = styled(InputDisabled)`
    margin-top: 10px;
`;

const PickerStyled = styled(Picker)`
    margin-top: 5px;
`;

const FavoriteButton = styled(IconButton)`
    margin-left: 15%;
    animation-duration: .5s;
    animation-timing-function: cubic-bezier(.19,.52,.41,1.31);
`;

const AuthorInfo = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Author = styled.div``;

const Users = styled.div`
    margin-left: 10px;
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
    id, author, category, doingName, defaultIcon, defaultColor, me, lang, pins, pinsCount,
    editDoing, toggleFavorite, removePin, closePopup }) => {
    const [ sideWindow, setSideWindow ] = useState(null);
    const [ icon, setIcon ] = useState(defaultIcon);
    const [ color, setColor ] = useState(defaultColor);

    const pin = pins.find( pin => pin.doing.id === id );

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

    const onClickFavorite = ({ currentTarget }) => {
        if ( pin.isFavorite ) {
            currentTarget.classList.add("pop");
            currentTarget.classList.remove("unpop");
        } else {
            currentTarget.classList.remove("pop");
            currentTarget.classList.add("unpop");
        }
        toggleFavorite({ pinId: pin.id });
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
                    <AuthorInfo>
                        <Author>
                            <TextSmall text={Words.author} lang={lang} />
                            <Username username={author.username} inline="true" size="small" />
                        </Author>
                        { pinsCount && 
                            <Users>
                                <TextSmall string={pinsCount} />
                                <TextSmall text={Words.using} lang={lang} />
                            </Users>
                        }
                        { pin && (
                            pin.isFavorite 
                                ? <FavoriteButton icon="favorite" size="medium" color={Theme.c_blue} onClick={onClickFavorite} />
                                : <FavoriteButton icon="favorite" size="medium" color={Theme.c_gray} onClick={onClickFavorite} />
                        )}
                    </AuthorInfo>
                </PopupContent>
                <Buttons>
                    <SmallButton text={Words.delete} lang={lang} color={Theme.c_red} onClick={onClickDelete} />
                    <LargeButtonStyled text={Words.okay} lang={lang} color={Theme.c_blue} onClick={onClickSubmit} />
                </Buttons>
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