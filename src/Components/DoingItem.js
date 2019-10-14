import React from 'react';
import styled from 'styled-components';
import TextMedium from './TextMedium';
import Icon from './Icon';
import Theme from '../Styles/Theme';
import IconButton from './IconButton';
import Button from './Button';
import Words from '../Lang/Words.json';
import IconImage from './IconImage';

const Container = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 -30px;
    padding: 10px 30px;
    border-top: 1px solid ${({ theme })=> theme.c_lightGray };
    &:last-child {
        border-bottom: 1px solid ${({ theme })=> theme.c_lightGray }; 
    }
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

const EditIcon = styled(Icon)`

`;

const IconContainer = styled.div`
    &:not(:last-child) {
        margin-right: 15px;
        padding-right: 15px;
        box-sizing: content-box;
        border-right: 1px solid ${({ theme })=> theme.c_lightGray };
    }
`;

const DoingItem = ({ id, name, color, icon, author, me, lang, onSelectDoing }) => {
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
                { me &&
                    ( me.id === author.id
                        ? <IconButton icon="pencel" size="medium" />
                        : <EditIcon icon="pencel" size="medium" color={Theme.c_lightGray} />
                    )
                }
                { id &&
                    <Button text={Words.select} lang={lang} className="narrow" onClick={onSelectDoing.bind(this, id)} />
                }
            </Column>
        </Container>
    )
}

export default DoingItem;