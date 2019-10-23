import React, { useState } from 'react';
import styled from 'styled-components';
import TextMedium from './TextMedium';
import Words from '../Lang/Words.json';
import IconButton from './IconButton';
import IconImage from './IconImage';
import EditDoing from './EditDoing';
import Button from './Button';

const Container = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
    border-top: 1px solid ${({ theme })=> theme.c_lightGray };
`;

const Column = styled.div`
    display: flex;
    align-items: center;
`;

const Color = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 6px;
    height: 100%;
    margin-right: 24px;
    background-color: ${({ color })=> color };
`;

const IconContainer = styled.div`
    &:not(:last-child) {
        margin-right: 15px;
        padding-right: 15px;
        box-sizing: content-box;
        border-right: 1px solid ${({ theme })=> theme.c_lightGray };
    }
`;

const DoingItem = ({ 
    id, name, category, color, icon, author, me, lang, 
    onSelectDoing, editDoingMutation, removePinMutation
}) => {
    const [ editDoing, setEditDoing ] = useState(false);

    const editDoingPopup = () => {
        setEditDoing(true);
    }

    const closePopup = () => {
        setEditDoing(false);
    }

    const selectingDoing = () => {
        onSelectDoing(id)
    }

    return (
        <Container>
            <Column>
                <Color color={color} />
                <TextMedium string={name} lang={lang} />
            </Column>
            <Column>
                <IconContainer>
                    <IconImage url={icon} size="medium" />
                </IconContainer>
                { ! onSelectDoing 
                    ? <IconButton icon="pencel" size="medium" onClick={editDoingPopup} />
                    : <Button text={Words.select} lang={lang} className="narrow" onClick={selectingDoing} />
                }
            </Column>
            { editDoing && 
                <EditDoing
                    id={id}
                    author={author}
                    category={category}
                    doingName={name}
                    defaultIcon={icon}
                    defaultColor={color}
                    closePopup={closePopup}
                    editDoingMutation={editDoingMutation}
                    removePinMutation={removePinMutation}
                    me={me}
                    lang={lang}
                /> 
            }
        </Container>
    )
}

export default DoingItem;