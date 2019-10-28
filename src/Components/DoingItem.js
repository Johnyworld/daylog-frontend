import React, { useState } from 'react';
import styled from 'styled-components';
import TextMedium from './TextMedium';
import Words from '../Lang/Words.json';
import IconButton from './IconButton';
import IconImage from './IconImage';
import EditDoing from './EditDoing';
import Button from './Button';
import Username from './Username';
import TextSmall from './TextSmall';

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

const Author = styled.div`
    display: flex;
    flex-direction: column;
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
    id, name, category, color, icon, author, me, lang, isAdding, pins, pinsCount,
    addPin, editDoing, toggleFavorite, removePin
}) => {
    const [ editDoingPopup, setEditDoingPopup ] = useState(false);

    const onEditDoingPopup = () => {
        setEditDoingPopup(true);
    }

    const closePopup = () => {
        setEditDoingPopup(false);
    }

    const selectingDoing = () => {
        addPin({
            id, name, icon, color, category,
            authorId: author.id,
            authorName: author.username,
        });
    }

    return (
        <Container>
            <Column>
                <Color color={color} />
                <Author>
                    <TextMedium string={name} lang={lang} />
                    { isAdding &&
                        <div>
                            <TextSmall text={Words.author} lang={lang} />
                            <Username username={author.username} inline="true" size="small" />
                            <TextSmall string={pinsCount} />
                            <TextSmall text={Words.using} lang={lang} />
                        </div>
                    }
                </Author>
            </Column>
            <Column>
                <IconContainer>
                    <IconImage url={icon} size="medium" />
                </IconContainer>
                { ! isAdding 
                    ? <IconButton icon="pencel" size="medium" onClick={onEditDoingPopup} />
                    : <Button text={Words.select} lang={lang} className="narrow" onClick={selectingDoing} />
                }
            </Column>
            { editDoingPopup && 
                <EditDoing
                    id={id}
                    author={author}
                    category={category}
                    doingName={name}
                    defaultIcon={icon}
                    defaultColor={color}
                    closePopup={closePopup}
                    editDoing={editDoing}
                    toggleFavorite={toggleFavorite}
                    removePin={removePin}
                    pinsCount={pinsCount}
                    pins={pins}
                    me={me}
                    lang={lang}
                /> 
            }
        </Container>
    )
}

export default DoingItem;