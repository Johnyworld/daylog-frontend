import React, { useState } from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json'
import Icon from './Icon';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import DoingButton from './DoingButton';
import useInput from '../Hooks/useInput';
import Input from './Input';
import LargeButton from './LargeButton';
import Theme from '../Styles/Theme';
import { useMutation } from 'react-apollo-hooks';
import { UPLOAD } from './WhatNow';
import { TODAY_QUERY } from '../Router';

const Container = styled.div`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const LinkStyled = styled(Link)`
    position: absolute;
    top: 30px;
    right: 64px;
`;

const DoingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    margin-bottom: 30px;
    button {
        margin-right: 0;
    }
`;

const LargeButtonStyled = styled(LargeButton)`
    display: block;
    margin-top: 30px;
    margin-left: auto;
`;

export default ({ doings, closePopup, lang }) => {
    const [ selectedDoing, setSelectedDoing ] = useState(null);
    const location = useInput('');

    const [ uploadMutation ] = useMutation( UPLOAD, {
        variables: { doingId: selectedDoing, location: location.value },
        refetchQueries: [{ query: TODAY_QUERY }]
    });

    const onClickButton = (e) => {
        const childNodes = e.currentTarget.parentNode.childNodes;
        setSelectedDoing(e.currentTarget.dataset.id);
        childNodes.forEach( node => {
            node.classList.remove('selected');
        });
        e.currentTarget.classList.add('selected');
    }

    const onClickSubmit = () => {
        uploadMutation();
        closePopup();
    }

    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.whatNow} remark={Words.whatNowRemark} lang={lang} closePopup={closePopup} />
                <LinkStyled to={`/doing`}>
                    <Icon icon="nut" size="medium" />
                </LinkStyled>
                <DoingGrid>
                    { doings[0] && doings.map( doing => (
                        <DoingButton key={doing.id} id={doing.id} name={doing.name} icon={doing.icon} color={doing.color} onClick={onClickButton} />
                    ))}
                </DoingGrid>
                <Input placeholder={Words.location} {...location} lang={lang} />
                <LargeButtonStyled text={Words.okay} lang={lang} onClick={onClickSubmit} color={Theme.c_blue} className={ !selectedDoing && "disabled" } />
            </Popup>
        </Container>
    )
}