import React from 'react';
import styled from 'styled-components';
import TextMedium from './TextMedium';
import Icon from './Icon';
import Theme from '../Styles/Theme';

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
    margin-right: 15px;
    padding-right: 15px;
    box-sizing: content-box;
    border-right: 1px solid ${({ theme })=> theme.c_lightGray };
`;

const DoingIcon = styled.div`
    width: 24px;
    height: 24px;
    background-color: #ddd;
`;

const DoingItem = ({ id, name, color, icon, author, me, lang }) => {
    return (
        <Container>
            <Column>
                <Color color={color} />
                <TextMedium string={name} lang={lang} />
            </Column>
            <Column>
                <IconContainer>
                    <DoingIcon>

                    </DoingIcon>
                </IconContainer>
                { me.id === author.id
                    ? <button><EditIcon icon="pencel" size="medium" /></button>
                    : <EditIcon icon="pencel" size="medium" color={Theme.c_lightGray} />
                }
            </Column>
        </Container>
    )
}

export default DoingItem;