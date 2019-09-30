import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const Container = styled.ul`
    ${({ theme })=> theme.wrap };
    ${({ theme })=> theme.box };
`;

export default ({ comments, me, lang }) => {
    return (
        <Container>
            { comments.map(comment => (
                <Comment
                    key={comment.id}
                    id={comment.id}
                    postId={comment.post.id}
                    text={comment.text}
                    author={comment.user.username}
                    avatar={comment.user.avatar}
                    createdAt={comment.createdAt}
                    lang={lang}
                    username={me.username}
                />
            ))}
        </Container>
    )
}