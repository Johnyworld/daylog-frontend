import React from 'react';
import styled from 'styled-components';
import DoingItem from './DoingItem';
import Theme from '../Styles/Theme';
import TextSmall from './TextSmall';

const Container = styled.div`
    margin-bottom: 50px;
`;

const DoingItems = styled.ul`
    @media screen and (min-width: 768px) {
        background-color: white;
        ${({ theme })=> theme.box };
    }
`;

const CategoryName = styled(TextSmall)`
    display: inline-block;
    margin-bottom: 10px;
`;

export default ({ category, doings, me, editDoingMutation, lang }) => {
    return (
        <Container>
            <CategoryName text={category.lang} lang={lang} weight="bold" color={Theme.c_black} />
            <DoingItems>
                { doings.map( doing => (
                    doing.category.name === category.name &&
                    <DoingItem 
                        key={doing.id}
                        id={doing.id}
                        name={doing.name}
                        category={category}
                        color={doing.color}
                        icon={doing.icon}
                        author={doing.author}
                        me={me}
                        editDoingMutation={editDoingMutation}
                        lang={lang}
                    />
                ))}
            </DoingItems>
        </Container>
    )
}