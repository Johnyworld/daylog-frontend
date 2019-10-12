import React, { useState } from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json';
import useInput from '../Hooks/useInput';
import Select from './Select';
import CategoryList from './CategoryList';
import InputLabel from './InputLabel';
import TextRegular from './TextRegular';
import Colors from '../Util/Colors';
import Icons from '../Util/Icons';
import IconButton from './IconButton';
import LargeButton from './LargeButton';
import Theme from '../Styles/Theme';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import LoaderRelative from './LoaderRelative';

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

const Name = styled.div`
    margin: 15px 0 10px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    margin-top: 5px;
`;

const Column = styled.div`
    display: flex;
    align-items: center;
    button {
        margin-left: 15px;
        padding-left: 15px;
        box-sizing: content-box;
        border-left: 1px solid ${({ theme })=> theme.c_lightGray };
    }
`;

const Palette = styled.div`
    background: ${({ color })=> color };
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 2px;
`;

const CustomIcon = styled.div`
    background: ${({ icon })=> `url(${icon})` };
    width: 24px;
    height: 24px;
`;

const LargeButtonStyled = styled(LargeButton)`
    display: block;
    margin-left: auto;
    margin-top: 50px;
`;

const SideWindow = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    padding: 30px;
    background-color: white;
    transition: 1s;
    transform: translateX(100%);
    &.show {
        transform: translateX(0);
    }
`;

const Items = styled.ul`
    overflow-y: scroll;
    overscroll-behavior: contain;
    height: 80%;
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 30px;
    justify-content: space-evenly;
    align-items: center;
`;

const Item = styled.li`
    width: 20px;
    height: 20px;
    margin: auto;
    ${({ type, value })=> {
        if (type === "icon") return `
            background: url(${ value });
            width: 24px;
            height: 24px;
        `;
        else if (type === "color") return `
            background: ${ value };
            border-radius: 50%;
        `;
    }}
`;

const AddDoing = ({ categories, closePopup, onSelectDoing, addDoingMutation, lang }) => {
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
                { !loading && data && data.seeCategoryList &&
                    <Select list={[ { name: "default", lang: Words.selectCategory }, ...data.seeCategoryList ]} onChange={onChangeCategory} lang={lang} className="left-align" />
                }
                { category.value !== "default" &&
                    <Name>
                        <InputLabel label={Words.doingName} value={term.value} onChange={onChangeTerm} placeholder={Words.enterDoingName} lang={lang} />
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
                    <Row>
                        <TextRegular text={Words.icon} lang={lang} weight="bold" />
                        <Column>
                            <CustomIcon icon={icon} />
                            <IconButton icon="pencel" size="medium" onClick={onClickSideWindow.bind(this, "icon")} />
                        </Column>
                    </Row>
                    <Row>
                        <TextRegular text={Words.color} lang={lang} weight="bold" />
                        <Column>
                            <Palette color={color} />
                            <IconButton icon="pencel" size="medium" onClick={onClickSideWindow.bind(this, "color")} />
                        </Column>
                    </Row>
                    <LargeButtonStyled text={Words.okay} lang={lang} color={Theme.c_blue} onClick={onClickSubmit} />
                </> }
                <SideWin 
                    type="color"
                    array={Colors}
                    sideWindow={sideWindow}
                    closePopup={closeSideWindow}
                    onClick={pickColor}
                    text={Words.colors}
                    lang={lang}
                />
                <SideWin 
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

const SideWin = ({ type, array, sideWindow, closePopup, onClick, text, lang }) => {
    return (
        <SideWindow className={ sideWindow === type ? "show" : "" } >
            <PopupHeader text={text} lang={lang} closePopup={closePopup} />
            <Items>
                { array.map( item => (
                    <button onClick={onClick.bind(this, item.value)} key={item.value} >
                        <Item value={item.value} type={type} />
                    </button>
                ))}
            </Items>
        </SideWindow>
    )
}


export default AddDoing;