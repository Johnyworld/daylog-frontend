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
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import LoaderRelative from './LoaderRelative';
import PickColor from './PickColor';
import PickIcon from './PickIcon';
import Picker from './Picker';

const SEE_CATEGORY_LIST = gql`
    {
        seeCategoryList {
            id
            name
            lang {
                id
                kr
                en
            }
        }
    }
`;

const Container = styled.section`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const PopupContent = styled.section`
   ${({ theme })=> theme.popupContent }; 
`;

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

const AddDoing = ({ closePopup, onSelectDoing, addDoingMutation, lang }) => {
    const { data, loading } = useQuery(SEE_CATEGORY_LIST);

    const [ sideWindow, setSideWindow ] = useState(null);
    const [ adding, setAdding ] = useState(false);
    const [ icon, setIcon ] = useState("");
    const [ color, setColor ] = useState("#555555");
    const category = useInput("default");
    const term = useInput("");

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
        addDoingMutation({ variables : { 
            name: term.value,
            categoryId: 
                data && data.seeCategoryList ?
                data.seeCategoryList.find( item => item.name === category.value ).id : "",
            icon,
            color
        }});
        closePopup();
    }

    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.addDoing} remark={Words.addDoingRemark} lang={lang} closePopup={closePopup} />
                { loading && <LoaderRelative /> }
                <PopupContent>
                    { !loading && data && data.seeCategoryList &&
                        <Select
                            list={[ { name: "default", lang: Words.selectCategory }, ...data.seeCategoryList ]}
                            onChange={onChangeCategory}
                            lang={lang}
                            className="left-align" 
                        />
                    }
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
                            category={category.value}
                            term={term.value}
                            lang={lang}
                            onSelectDoing={onSelectDoing} 
                            setAdding={setAdding}
                        />
                    }
                    { adding && <>
                        <PickerStyled onClick={onClickSideWindow} type="icon" icon={icon} lang={lang} />
                        <PickerStyled onClick={onClickSideWindow} type="color" color={color} lang={lang} />
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