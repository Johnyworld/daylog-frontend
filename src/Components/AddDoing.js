import React, { useState } from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json';
import useInput from '../Hooks/useInput';
import Select from './Select';
import CategoryList from './CategoryList';
import InputLabel from './InputLabel';
import Colors from '../Util/Colors';
import Icons from '../Util/Icons';
import LargeButton from './LargeButton';
import Theme from '../Styles/Theme';
import PickColor from './PickColor';
import PickIcon from './PickIcon';
import Picker from './Picker';

const Container = styled.section`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const PopupContent = styled.section``;

const Name = styled.div`
    margin: 15px 0 10px;
`;

const PickerStyled = styled(Picker)`
    margin-top: 5px;
`;

const LargeButtonStyled = styled(LargeButton)`
    display: block;
    margin-left: auto;
    margin-top: 50px;
`;

const AddDoing = ({ me, categories, myDoings, closePopup, addPin, addDoing, lang }) => {
    const [ sideWindow, setSideWindow ] = useState(null);
    const [ adding, setAdding ] = useState(false);
    const [ icon, setIcon ] = useState("");
    const [ color, setColor ] = useState("#555555");
    const term = useInput("");
    const category = useInput("default");
    const categoryObj = categories.find( categoryItem => categoryItem.name === category.value );

    const onChangeCategory = (e) => {
        category.onChange(e);
        setAdding(false);
    }

    const onChangeTerm = (e) => {
        term.onChange(e);
        setAdding(false);
    }

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

    const onClickSubmit = () => {
        addDoing({
            name: term.value,
            icon,
            color,
            authorId: me.id,
            authorName: me.username,
            category: categoryObj
        });
        closePopup();
    }

    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.addDoing} remark={Words.addDoingRemark} lang={lang} closePopup={closePopup} />
                <PopupContent>
                    <Select
                        list={[ { name: "default", lang: Words.selectCategory }, ...categories ]}
                        onChange={onChangeCategory}
                        lang={lang}
                        className="left-align" 
                    />
                    { category.value !== "default" &&
                        <Name>
                            <InputLabel
                                label={Words.doingName}
                                value={term.value}
                                onChange={onChangeTerm}
                                placeholder={Words.enterDoingName}
                                lang={lang}
                            />
                        </Name>
                    }
                    { term.value !== "" && !adding &&
                        <CategoryList
                            category={categoryObj}
                            myDoings={myDoings}
                            term={term.value}
                            lang={lang}
                            addPin={addPin} 
                            setAdding={setAdding}
                        />
                    }
                    { adding && <>
                        <PickerStyled onClick={onClickSideWindow} type="icon" icon={icon} lang={lang} isMine={true} />
                        <PickerStyled onClick={onClickSideWindow} type="color" color={color} lang={lang} isMine={true} />
                        <LargeButtonStyled text={Words.okay} lang={lang} color={Theme.c_blue} onClick={onClickSubmit} />
                    </> }
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

export default AddDoing;