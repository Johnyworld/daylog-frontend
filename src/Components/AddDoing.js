import React from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json';
import useInput from '../Hooks/useInput';
import Select from './Select';
import CategoryList from './CategoryList';
import InputLabel from './InputLabel';

const Container = styled.section`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const InputStyled = styled(InputLabel)`
    margin-top: 10px;
    margin-left: 3px;
`;

const AddDoing = ({ categories, closePopup, onSelectDoing, lang }) => {
    const category = useInput("default");
    const term = useInput("");

    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.addDoing} lang={lang} closePopup={closePopup} />
                <Select list={categories} onChange={category.onChange} lang={lang} className="left-align" />
                { category.value !== "default" &&
                    <InputStyled label={Words.doingName} {...term} placeholder={Words.enterDoingName} lang={lang} />
                }
                { term.value !== "" &&
                    <CategoryList category={category.value} term={term.value} lang={lang} onSelectDoing={onSelectDoing} />
                }
            </Popup>
        </Container>
    )
}

export default AddDoing;