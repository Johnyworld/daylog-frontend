import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import TextRegular from './TextRegular';
import TextSmall from './TextSmall';
import { dateConvertor } from '../Util/Convertors';

const Container = styled.li`
    display: flex;
    > div:first-child {
        margin-right: 10px;
    }
`;

const Texts = styled.article`
    > p {
        margin-bottom: 3px;
        > span:first-child {
            display: inline-block;
            margin-right: 6px;
        }
    }
`;

const Comment = ({
    text,
    author,
    avatar,
    createdAt,
    lang
}) => {
    return (
        <Container>
            <Avatar avatar={avatar} size="small" />
            <Texts>
                <p>
                    <TextRegular string={author} weight="bold" />
                    <TextRegular string={text} />
                </p>
                <TextSmall string={dateConvertor(createdAt, lang)} />
            </Texts>
        </Container>
    )
}

export default Comment;