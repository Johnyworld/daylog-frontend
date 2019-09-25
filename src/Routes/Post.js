import React, { useState } from 'react'; 
import styled from 'styled-components';
import Header from '../Components/Header';
import Headers from '../Lang/Headers.json';
import CommentJson from '../Lang/Comment.json';
import { getLang, languages } from '../Lang/Languages';
import FeedItem from '../Components/FeedItem';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Loader from '../Components/Loader';
import Comment from '../Components/Comment';
import NewComment from '../Components/newComment';
import useInput from '../Hooks/useInput';

const ADD_COMMENT = gql`
    mutation addComment( $postId: String!, $text: String! ) {
        addComment( postId: $postId, text: $text ) {
            id
            text
            createdAt
            user {
                username
                avatar
            }
        }
    }
`;

export const SEE_POST = gql`
    query seePost( $id: String! ) {
        seePost( id : $id ) {
            id
            location
            startAt
            endAt
            blocks
            isLiked
            likesCount
            commentsCount
            doing {
                name
                category {
                    name
                }
            }
            user {
                username
                avatar
            }
            comments {
                id
                text
                createdAt
                user {
                    username
                    avatar
                }
            }
        }
    }
`;

const Container = styled.main`
    padding-bottom: 40px;
`;

const Comments = styled.ul`
    padding: 20px;
    > li {
        margin-bottom: 20px;
    }
`;

export default () => {
    const lang = getLang();
    const id = window.location.hash.split("/")[2];
    const newComment = useInput('');
    const { data, loading } = useQuery(SEE_POST, { variables: { id }});
    const [ selfComments, setSelfComments ] = useState('');
    const [ addCommentMutation ] = useMutation( 
        ADD_COMMENT, { 
            variables: { postId: id, text: newComment.value },
            refetchQueries: [{ query: SEE_POST, variables: { id }}]
        }
    );
    
    const failToSend = languages(CommentJson.failToSend, lang);

    const onKeyPress = async e => {
        const { which } = e;
        if ( which === 13 ) {
            e.preventDefault();
            try {
                const { data: { addComment }} = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
                newComment.setValue("");
            } catch {
                alert(failToSend);
            }
        }
    }

    return (
    <>
        <Header isDepth={true} text={Headers.comments} lang={lang} />
        { loading ? <Loader /> : (
            <Container>
                <FeedItem 
                    id={data.seePost.id}
                    key={data.seePost.id}
                    doing={data.seePost.doing.name}
                    category={data.seePost.doing.category.name}
                    author={data.seePost.user.username}
                    avatar={data.seePost.user.avatar}
                    isLiked={data.seePost.isLiked}
                    location={data.seePost.location}
                    likesCount={data.seePost.likesCount}
                    commentsCount={data.seePost.commentsCount}
                    startAt={data.seePost.startAt}
                    endAt={data.seePost.endAt}
                    blocks={data.seePost.blocks}
                    lang={lang}
                    post={data.seePost}
                    disableComment={true}
                />
                <Comments>
                    { data.seePost.comments.map(comment => (
                        <Comment
                            key={comment.id}
                            text={comment.text}
                            author={comment.user.username}
                            avatar={comment.user.avatar}
                            createdAt={comment.createdAt}
                        />
                    ))}
                </Comments>
            </Container>
        )}
        <NewComment
            lang={lang}
            onKeyPress={onKeyPress}
            value={newComment.value}
            onChange={newComment.onChange}
        />
    </>
    )
}