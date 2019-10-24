import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const Container = styled.ul`
    ${({ theme })=> theme.wrap };
    ${({ theme })=> theme.box };
`;

export default ({ comments, newComments, me, lang, editCommentMutation }) => {
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
                    isCreating={comment.isCreating}
                    lang={lang}
                    username={me.username}
                    editCommentMutation={editCommentMutation}
                />
            ))}
            { newComments.map(comment => (
                <Comment
                    key={comment.id}
                    id={comment.id}
                    postId={comment.post.id}
                    text={comment.text}
                    author={comment.user.username}
                    avatar={comment.user.avatar}
                    createdAt={comment.createdAt}
                    isCreating={comment.isCreating}
                    lang={lang}
                    username={me.username}
                    editCommentMutation={editCommentMutation}
                />
            ))}
        </Container>
    )
}