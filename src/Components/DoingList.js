import React from 'react';
import styled from 'styled-components';
import DoingItem from './DoingItem';
import Theme from '../Styles/Theme';
import TextSmall from './TextSmall';

const Container = styled.ul`
    margin-bottom: 50px;
    .text-small {
        display: inline-block;
        margin-bottom: 10px;
    }
`;

export default ({ category, doings, me, lang }) => {
    return (
        <Container>
            <TextSmall text={category.lang} lang={lang} weight="bold" color={Theme.c_black} />
            { doings.map( doing => (
                doing.category.name === category.name &&
                <DoingItem 
                    key={doing.id}
                    name={doing.name}
                    color={doing.color}
                    icon={doing.icon}
                    author={doing.author}
                    me={me}
                    lang={lang}
                />
            ))}
        </Container>
    )
}